const queryFormatter = (params: Record<string, unknown | unknown[]> = {}) => {
  const searchParams = new URLSearchParams();

  for (const key in params) {
    const value = params[key];

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== null && item !== undefined && item !== "") {
          searchParams.append(key, String(item));
        }
      });
    } else if (value !== null && value !== undefined && value !== "") {
      searchParams.append(key, String(value));
    }
  }

  return searchParams.toString();
};

export default queryFormatter;
