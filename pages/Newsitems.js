import React from "react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default function NewsItem(props) {
  const { title, description, imageUrl, articleUrl, publishedDate, sourceName } = props;

  if (title !== "[Removed]" && description !== "[Removed]" && imageUrl !== "[Removed]") {
    return (
      <a
        href={articleUrl}
        rel="noreferrer"
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        <div className="container my-3">
          <div
            className="card h-100 shadow-sm"
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <img
                src={imageUrl}
                className="card-img-top img-fluid"
                alt="news"
                style={{
                  height: "150px",
                  objectFit: "cover",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#333" }}>
                  {title}
                </h5>
                <p className="card-text" style={{ fontSize: "0.9rem", color: "#555" }}>
                  {description}...
                </p>
              </div>
            </div>
            <div className="card-footer" style={{ backgroundColor: "#f7f7f7", borderTop: "1px solid #ddd", padding: "10px" }}>
              <div className="d-flex justify-content-between align-items-center">
                <span className="badge bg-primary" style={{ fontSize: "0.75rem" }}>
                  {sourceName}
                </span>
                <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                  {formatDate(publishedDate)}
                </small>
              </div>
            </div>
          </div>
        </div>
      </a>
    );
  } else {
    return null;
  }
}
