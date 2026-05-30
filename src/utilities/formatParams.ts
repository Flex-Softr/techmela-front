const objectToSearchParams = (
  obj: Record<string, string | string[] | undefined>
): string => {
  const searchParams = new URLSearchParams();

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item === undefined || item === null || item === "") return;
        searchParams.append(key, item);
      });
    } else if (value !== "") {
      searchParams.append(key, value.toString());
    }
  }

  return searchParams.toString();
};

export default objectToSearchParams;
