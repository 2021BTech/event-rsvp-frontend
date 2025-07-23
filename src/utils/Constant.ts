export default class Constants {

  static apiBaseUrl = process.env.REACT_APP_BASEURL;

  static defaultModalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      overflow: "visible",
      zIndex: 1000,
    },
  };
}
