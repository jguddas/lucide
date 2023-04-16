import { useMemo } from 'react';
import { useRouter } from 'next/router';
import IconDetailOverlay from '../../components/IconDetailOverlay';
import IconOverview from '../../components/IconOverview';
import Layout from '../../components/Layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import data from 'src/generated/data';
import categories from 'src/generated/categories';

const IconPage = ({ icon }): JSX.Element => {
  const router = useRouter();

  const onClose = () => {
    let query = {};

    if (router.query.search) {
      query = {
        search: router.query.search,
      };
    }

    router.push(
      {
        pathname: '/icons',
        query,
      },
      undefined,
      { scroll: false, shallow: true }
    );
  };

  return (
    <Layout>
      <IconDetailOverlay key={icon.name} icon={icon} close={onClose} open />
      <IconOverview {...{ data, categories }} key="icon-overview" />
    </Layout>
  );
};

export default IconPage;

export const getStaticProps: GetStaticProps = async ({ params: { iconName } }) => {
  const icon = data.find((val) => val.name === iconName);

  return { props: { icon } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: data.map(({ name: iconName }) => ({
      params: { iconName },
    })),
    fallback: false,
  };
};
