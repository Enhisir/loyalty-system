import classes from "./header.module.css";
import AccountSection from "./components/accountSection";
import Logo from "./components/logo";

export default function Header({ landing = false }: { landing?: boolean }) {
  return (
    <header className={ landing ? classes.landingHeader : classes.header }>
      <div className={classes.leftWrapper}><Logo /></div>
      <div className={classes.rightWrapper}><AccountSection /></div>
    </header>
  );
}
