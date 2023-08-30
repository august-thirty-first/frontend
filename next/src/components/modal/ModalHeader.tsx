interface ModalHeaderProps {
  title: string;
}

const ModalHeader = ({ title }: ModalHeaderProps) => {
  return (
    <div className="pb-3 text-center">
      <p className="text-2xl font-bold">{title}</p>
    </div>
  );
};

export default ModalHeader;
