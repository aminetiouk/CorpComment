import React from 'react';

type companyListProps = {
  children: React.ReactNode;
};
export default function HashtagList({ children }: companyListProps) {
  return <ul className="hashtags">{children}</ul>;
}
