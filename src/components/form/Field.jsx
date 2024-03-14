import React from "react";

export default function Field({ label, children, htmlFor, error }) {
  const id = htmlFor || getChildId(children);
  return (
    <div className='mb-6'>
      {label && (
        <label htmlFor={id} className='block mb-2'>
          {label}
        </label>
      )}
      {children}
      {error && <p className='text-red-500 mt-2 font-[600]'>{error.message}</p>}
    </div>
  );
}

const getChildId = (children) => {
  const child = React.Children.only(children);
  if ("id" in child.props) {
    return child?.props?.id;
  }
};