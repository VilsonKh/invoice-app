import ContentLoader from "react-content-loader";

const SkeletonLoader = () => {
  return (
  <ContentLoader
    speed={2}
    width={730}
    height={93}
    viewBox="0 0 730 93"
    backgroundColor="#f3f3f3"
    foregroundColor="#b1b1b1"
  >
      <rect x="0" y="0" rx="5" ry="5" width="730" height="93" />
  </ContentLoader>
  )
}

export default SkeletonLoader