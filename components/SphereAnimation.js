const SphereAnimation = ({ className }) => (
  <div style={{ height: "200px", width: "200px" }} className={className}>
    <style>
      {`
      body {
          background-color: white;
      }
      .disc {
          position: absolute;
          width:200px;
          height:200px;
          border:2px solid #1D4ED8;
          border-radius:50%;
          animation-iteration-count: infinite;
          animation-direction:reverse;
          animation-timing-function:linear;
          perspective:1000px;
      }
      @keyframes rotate1 {
          0%  {transform:rotate3d(1,1,1,  0deg)}
          50% {transform:rotate3d(1,1,1,180deg)}
          100%{transform:rotate3d(1,1,1,360deg)}
      }
      @keyframes rotate2 {
          0%  {transform:rotate3d(1,1,0,  0deg)}
          50% {transform:rotate3d(1,1,0,180deg)}
          100%{transform:rotate3d(1,1,0,360deg)}
      }
      @keyframes rotate3 {
          0%  {transform:rotate3d(1,0,1,  0deg)}
          50% {transform:rotate3d(1,0,1,180deg)}
          100%{transform:rotate3d(1,0,1,360deg)}
      }
      @keyframes rotate4 {
          0%  {transform:rotate3d(0,1,1,  0deg)}
          50% {transform:rotate3d(0,1,1,180deg)}
          100%{transform:rotate3d(0,1,1,360deg)}
      }
      @keyframes rotate5 {
          0%  {transform:rotate3d(1,0,0,  0deg)}
          50% {transform:rotate3d(1,0,0,180deg)}
          100%{transform:rotate3d(1,0,0,360deg)}
      }`}
    </style>
    <div className="disc" style={{ animationName: "rotate1", animationDuration: "3.2s" }}></div>
    <div className="disc" style={{ animationName: "rotate2", animationDuration: "4.3s" }}></div>
    <div className="disc" style={{ animationName: "rotate3", animationDuration: "3.5s" }}></div>
    <div className="disc" style={{ animationName: "rotate4", animationDuration: "3.8s" }}></div>
    <div className="disc" style={{ animationName: "rotate5", animationDuration: "4.2s" }}></div>
  </div>
);

export default SphereAnimation;
