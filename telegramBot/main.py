import logging
from telegram import Update, ReplyKeyboardRemove, InputFile
from telegram.ext import Application, CommandHandler, MessageHandler, filters, CallbackContext, ConversationHandler, ContextTypes
import qrcode
import io

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

users_data = {}
PHONE_NUMBER, PASSWORD = range(2)


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user = update.effective_user
    await update.message.reply_markdown_v2(
        fr'Привет, {user.mention_markdown_v2()}\! Пожалуйста, отправьте мне свой номер телефона\.',
        reply_markup=ReplyKeyboardRemove(),
    )
    return PHONE_NUMBER


async def get_phone_number(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    phone_number = update.message.text
    context.user_data['phone_number'] = phone_number
    await update.message.reply_text("Отлично! Теперь отправьте свой пароль.")
    return PASSWORD


async def get_password(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user_id = update.effective_user.id
    password = update.message.text
    context.user_data['password'] = password
    context.user_data['points'] = 300
    users_data[user_id] = context.user_data
    await update.message.reply_text("Спасибо за регистрацию! Вы получили 300 бонусных баллов")
    await show_onboard(update, context)
    return ConversationHandler.END


async def show_onboard(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "Добро пожаловать! Вот что вы можете сделать:\n"
        "- Используйте команду /show_points, чтобы посмотреть количество накопленных баллов.\n"
        "- Используйте команду /qr_code, чтобы получить свой QR-код."
    )


async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    await update.message.reply_text("Регистрация отменена.")
    return ConversationHandler.END


async def qr_code(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = update.effective_user
    if user.id in users_data:
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(f'User ID: {user.id}')
        qr.make(fit=True)

        img = qr.make_image(fill='black', back_color='white')
        bio = io.BytesIO()
        bio.name = 'user_qr.png'
        img.save(bio, 'PNG')
        bio.seek(0)

        await update.message.reply_photo(photo=InputFile(bio))
    else:
        await update.message.reply_text('Сначала зарегистрируйтесь!')


async def show_points(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = update.effective_user
    if user.id in users_data:
        points = users_data[user.id].get('points', 0)
        await update.message.reply_text(f'У вас {points} накопленных баллов.')
    else:
        await update.message.reply_text('Сначала зарегистрируйтесь!')


def main() -> None:
    """Запуск бота."""
    application = Application.builder().token("6837011065:AAEsAfxa92KgtmbFd6RVedRjDgyEV9ZpuQc").build()

    registration_handler = ConversationHandler(
        entry_points=[CommandHandler('start', start)],
        states={
            PHONE_NUMBER: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_phone_number)],
            PASSWORD: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_password)]
        },
        fallbacks=[CommandHandler('cancel', cancel)],
    )
    application.add_handler(registration_handler)

    application.add_handler(CommandHandler("qr_code", qr_code))
    application.add_handler(CommandHandler("show_points", show_points))

    application.run_polling()


if __name__ == '__main__':
    main()
