import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Robert Mitchell - Senior Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(34, 211, 209, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
        }}
      >
        {/* Border frame */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: "2px solid rgba(34, 211, 209, 0.3)",
            borderRadius: 8,
            display: "flex",
          }}
        />

        {/* Corner decorations */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            width: 40,
            height: 40,
            borderTop: "3px solid #22d3d1",
            borderLeft: "3px solid #22d3d1",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 40,
            height: 40,
            borderTop: "3px solid #22d3d1",
            borderRight: "3px solid #22d3d1",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            width: 40,
            height: 40,
            borderBottom: "3px solid #22d3d1",
            borderLeft: "3px solid #22d3d1",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            width: 40,
            height: 40,
            borderBottom: "3px solid #22d3d1",
            borderRight: "3px solid #22d3d1",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          {/* Status line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 16,
              fontFamily: "monospace",
              color: "rgba(34, 211, 209, 0.7)",
              letterSpacing: 2,
            }}
          >
            <span style={{ color: "#22c55e" }}>●</span>
            <span>STATUS: ACTIVE</span>
            <span style={{ color: "rgba(34, 211, 209, 0.4)" }}>|</span>
            <span>CLEARANCE: SENIOR</span>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: 4,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Robert Mitchell
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 32,
              fontFamily: "monospace",
              color: "#22d3d1",
              letterSpacing: 6,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Senior Software Engineer
          </div>

          {/* Divider */}
          <div
            style={{
              width: 400,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, #22d3d1, transparent)",
              display: "flex",
            }}
          />

          {/* Tech stack */}
          <div
            style={{
              display: "flex",
              gap: 16,
              fontSize: 18,
              fontFamily: "monospace",
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            <span>React</span>
            <span style={{ color: "rgba(139, 92, 246, 0.6)" }}>•</span>
            <span>React Native</span>
            <span style={{ color: "rgba(139, 92, 246, 0.6)" }}>•</span>
            <span>Next.js</span>
            <span style={{ color: "rgba(139, 92, 246, 0.6)" }}>•</span>
            <span>TypeScript</span>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: 48,
              marginTop: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#22d3d1",
                }}
              >
                3+
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontFamily: "monospace",
                  color: "rgba(255, 255, 255, 0.5)",
                  textTransform: "uppercase",
                }}
              >
                Years Exp
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#22d3d1",
                }}
              >
                50K+
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontFamily: "monospace",
                  color: "rgba(255, 255, 255, 0.5)",
                  textTransform: "uppercase",
                }}
              >
                Monthly Users
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#22d3d1",
                }}
              >
                5+
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontFamily: "monospace",
                  color: "rgba(255, 255, 255, 0.5)",
                  textTransform: "uppercase",
                }}
              >
                Products
              </span>
            </div>
          </div>
        </div>

        {/* Bottom command line */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            fontFamily: "monospace",
            color: "rgba(34, 211, 209, 0.5)",
          }}
        >
          <span style={{ color: "#8b5cf6" }}>&gt;</span>
          <span>./view_portfolio</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
