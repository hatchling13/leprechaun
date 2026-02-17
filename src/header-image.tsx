export type HeaderImageProps = {
  width: number;
  height: number;
  title: string;
  subtitle?: string;
  bgImageUrl?: string;
  date?: string;
  category?: string;
};

export type HeaderImageParams = Omit<HeaderImageProps, "width" | "height">;

export const HeaderImage = ({
  width,
  height,
  title,
  subtitle,
  bgImageUrl,
  date,
  category,
}: HeaderImageProps) => {
  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: "#111",
        color: "white",
        overflow: "hidden",
      }}
    >
      {bgImageUrl && (
        <img
          src={bgImageUrl}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: width,
            height: height,
            objectFit: "cover", // Satori supports object-fit on img tags
          }}
        />
      )}

      {/* 2. Dark Overlay for Text Readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: width,
          height: height,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          display: "flex",
        }}
      />

      {/* 3. Main Content Layer */}
      <div
        style={{
          position: "relative", // Sits above the absolute overlay
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          width: "100%",
          height: "100%",
          overflowWrap: "break-word",
          wordBreak: "keep-all",
        }}
      >
        {/* Category Badge */}
        {category && (
          <div
            style={{
              display: "flex",
              padding: "10px 24px",
              borderRadius: 8,
              marginBottom: 32,
              alignSelf: "flex-start", // Prevents badge from stretching full width
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {category}
            </span>
          </div>
        )}

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 100,
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              display: "flex",
              fontSize: 48,
              color: "#ccc",
              marginBottom: 48,
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Footer: Date */}
        {date && (
          <div
            style={{
              display: "flex",
              marginTop: "auto", // Pushes to the bottom of the flex container
              fontSize: 32,
              color: "#aaa",
            }}
          >
            {date}
          </div>
        )}
      </div>
    </div>
  );
};
