export function handleShare({
  title,
  text,
  url,
}: {
  title: string;
  text: string;
  url: string;
}) {
  if (navigator.share) {
    navigator
      .share({
        title,
        text,
        url,
      })
      .then(() => {
        console.log("Shared successfully");
      })
      .catch((error) => {
        console.error("Error sharing:", error);
      });
  } else {
    console.warn("Share API is not supported in this browser.");
  }
}
