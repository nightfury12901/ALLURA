const DropAnimationIn = ({
  char,
  index,
  frame,
  fps,
  animationTextInFrames
}: {
  char: string;
  index: number;
  frame: number;
  fps: number;
  animationTextInFrames: number;
}) => {
  const endTime = animationTextInFrames / fps;
  const time = frame / fps;

  const progress = Math.min(Math.max(time / endTime, 0), 1);

  const scale = 3 - progress * 2;
  const opacity = progress;

  return (
    <span
      key={index}
      style={{
        display: "inline-block",
        transform: `scale(${scale})`,
        opacity: opacity
      }}
    >
      {char === " " ? " " : char}
    </span>
  );
};

export default DropAnimationIn;
