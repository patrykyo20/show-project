const CardLayout = ({
  children,
  className
}: Readonly<{
  children: React.ReactNode;
  className: string;
}>) => {
  return (
    <div
      className={`border-r-2 border-b-4 border-l-2 border-headline
        rounded-[20px] border-t-[0.5px] hover:drop-shadow-custom transition-all duration-500
      bg-primary ${className}`}
    >
      {children}
    </div>
  );
};
  
export default CardLayout;
  