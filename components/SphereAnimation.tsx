/**
 * A CSS spinning circles animation
 */
export default function SphereAnimation({ className }: { className: string }) {
  return (
    <div style={{ height: "200px", width: "200px", position: "relative" }} className={className}>
      <style>
        {`
      .outer-disc {
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
      .inner-disc {
          position: absolute;
          top: 5px;
          left: 5px;
          width: 190px;
          height: 190px;
          border:2px solid #2563EB;
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
          0%  {transform:rotate3d(1,1,0,  0deg)}
          50% {transform:rotate3d(1,1,0,180deg)}
          100%{transform:rotate3d(1,1,0,360deg)}
      }
      @keyframes rotate6 {
          0%  {transform:rotate3d(0,1,1,  0deg)}
          50% {transform:rotate3d(0,1,1,180deg)}
          100%{transform:rotate3d(0,1,1,360deg)}
      }`}
      </style>
      <div className="outer-disc" style={{ animationName: "rotate1", animationDuration: "5.2s" }}></div>
      <div className="outer-disc" style={{ animationName: "rotate2", animationDuration: "4.3s" }}></div>
      <div className="outer-disc" style={{ animationName: "rotate3", animationDuration: "3.5s" }}></div>
      <div className="inner-disc" style={{ animationName: "rotate4", animationDuration: "3.8s" }}></div>
      <div className="inner-disc" style={{ animationName: "rotate5", animationDuration: "4.2s" }}></div>
      <div className="inner-disc" style={{ animationName: "rotate6", animationDuration: "3.6s" }}></div>
    </div>
  );
}
