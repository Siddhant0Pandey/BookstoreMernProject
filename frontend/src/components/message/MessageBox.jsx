/* eslint-disable react/prop-types */
function MessageBox({ message }) {
  return (
    <div className="h-16 w-[320px] border border-green-500 text-xl text-green-500 fixed bottom-0 right-0">
      Book {message} successfully!
    </div>
  );
}

export default MessageBox;
