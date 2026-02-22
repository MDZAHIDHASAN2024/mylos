type Title = {
  title: string;
};

import { Helmet } from 'react-helmet';
const PageTitle = ({ title }: Title) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </div>
  );
};

export default PageTitle;
