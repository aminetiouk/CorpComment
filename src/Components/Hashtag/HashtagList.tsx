import HashtagItem from '../Hashtag/HashtagItem';

type companyListProps = {
  companyList: string[];
  handleSelectCompany: (company: string) => void;
};
export default function HashtagList({
  companyList,
  handleSelectCompany
}: companyListProps) {
  return (
    <ul className="hashtags">
      {companyList.map((company: string) => (
        <HashtagItem company={company} onSelectCompany={handleSelectCompany} />
      ))}
    </ul>
  );
}
