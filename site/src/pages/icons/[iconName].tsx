import {useRouter} from 'next/router';
import IconDetailOverlay from '../../components/IconDetailOverlay';
import {getAllData, getData} from '../../lib/icons';
import IconOverview from '../../components/IconOverview';
import Layout from '../../components/Layout';
import {useMemo} from 'react';
import MobileMenu from "../../components/MobileMenu";
import {fetchLatestRelease} from "../../lib/fetchAllReleases";

const IconPage = ({icon, data, currentVersion}) => {
  const router = useRouter();
  const getIcon = iconName => data.find(({name}) => name === iconName) || {};

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
      {scroll: false},
    );
  };

  const currentIcon = useMemo(() => {
    if (icon.name === router.query.iconName) {
      return icon;
    }
    return getIcon(router.query.iconName);
  }, [router.query]);

  return (
    <Layout>
      <MobileMenu/>
      <IconDetailOverlay key={currentIcon?.name} icon={currentIcon} close={onClose} open/>
      <IconOverview {...{currentIcon, data, currentVersion}} />
    </Layout>
  );
};

export default IconPage;

export async function getStaticProps({params: {iconName}}) {
  const data = await getAllData();
  const icon = await getData(iconName);
  const currentVersion = await fetchLatestRelease();
  return {props: {icon, data, currentVersion}};
}

export async function getStaticPaths() {
  const data = await getAllData();

  return {
    paths: data.map(({name: iconName}) => ({
      params: {iconName},
    })),
    fallback: false,
  };
}
