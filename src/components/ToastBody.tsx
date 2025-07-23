const ToastBody = ({ title, message }: { title: string; message: string }) => (
  <div>
    <p className="font-semibold">{title}</p>
    <p>{message}</p>
  </div>
);

export default ToastBody;
