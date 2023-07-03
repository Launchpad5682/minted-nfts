import { FunctionComponent } from "react";

interface Props {
  visible?: boolean;
  absolute?: boolean;
}

const Loader: FunctionComponent<Props> = (props: Props) => {
  const { visible, absolute } = props;

  if (visible) {
    return (
      <div
        className={`${
          absolute ? "absolute" : ""
        } left-0 top-0 flex h-full w-full items-center justify-center`}
      >
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-green-600 motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export { Loader };
