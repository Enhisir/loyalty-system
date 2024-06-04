import { BeatLoader } from "react-spinners";

export default function CustomBeatLoader() {
  return (
    <BeatLoader
      color="black"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}
