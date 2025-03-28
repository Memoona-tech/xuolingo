interface Props {
    children: React.ReactNode;
  }
  
  export const FeedWrapper = ({ children }: Props) => {
    return (
      <div className="flex-1 flex flex-col pb-10">
        {children}
      </div>
    );
  };
  