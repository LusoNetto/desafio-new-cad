import loadingGif from "../../assets/loading.gif";

const Loading = () => {
  return (
    <>    
      Loading<br /><img style={{width: "20px", height: "20px"}} src={loadingGif} alt="loading icon" />
    </>
  )
}

export default Loading