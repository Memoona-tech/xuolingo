interface Props {
    children: React.ReactNode;
  }
  
  export const StickyWrapper = ({ children }: Props) => {
    return (
      <div className="hidden lg:block w-[368px]">
        <div className="sticky top-0 flex flex-col gap-y-4">
          {children}
        </div>
      </div>
    );
  };
  