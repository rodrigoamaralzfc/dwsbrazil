export const formatDate = (dateString: string, format = "short") => {
  const date = new Date(dateString);

  if (format === "long") {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const sortByNewest = <T extends { createdAt: string }>(
  list: T[],
): T[] => {
  return list.sort((a, b) => {
    const ta = new Date(a.createdAt).getTime();
    const tb = new Date(b.createdAt).getTime();
    return tb - ta;
  });
};

export const sortByOldest = <T extends { createdAt: string }>(
  list: T[],
): T[] => {
  return list.sort((a, b) => {
    const ta = new Date(a.createdAt).getTime();
    const tb = new Date(b.createdAt).getTime();
    return ta - tb;
  });
};
