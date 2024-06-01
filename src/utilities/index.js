import imageCompression from "browser-image-compression";

export const handleInput = (fieldName, value, setProfile) => {
  setProfile((prev) => ({
    ...prev,
    [fieldName]: value,
  }));
};

export const handleArrayInputChange = (fieldName, value, setProfile) => {
  const updatedValues = value.split(",");
  handleInput(fieldName, updatedValues, setProfile);
};

export const handleInputInsideInputChange = (
  value,
  input1,
  input2,
  setProfile
) => {
  setProfile((prevProfile) => ({
    ...prevProfile,
    [input1]: {
      ...prevProfile.location,
      [input2]: value,
    },
  }));
};

export const dataURLtoFile = (dataURL) => {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], "image.png", { type: mime });
};

export const formatDate = (inputDate) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(inputDate);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}, ${dayOfWeek}`;

  return formattedDate;
};

export const compressImage = async (file) => {
  console.log("originalFile instanceof Blob", file instanceof Blob); // true
  console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    console.log(
      "compressedFile instanceof Blob",
      compressedFile instanceof Blob
    ); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    return compressedFile;
  } catch (error) {
    console.log(error);
  }
};

export const goodDateFormat = (inputDate) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [year, month, day] = inputDate.split("-");
  const monthIndex = parseInt(month, 10) - 1;

  return `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
};

export const getCounsellorAmount = (amount) => {
  let counsellorAmount =
    (10000 * amount) / (10000 + 100 * 18 + 100 * 5 + 18 * 5);

  return counsellorAmount;
};

export const parseTimestamp = (timestamp) => {
  const dt = new Date(timestamp);

  const date = dt.toISOString().split("T")[0];

  let hours = dt.getUTCHours();
  const minutes = dt.getUTCMinutes();
  const seconds = dt.getUTCSeconds();
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${period}`;

  return {
    date: date,
    time: formattedTime,
  };
};
export const calculateOriginalAmount = (totalAmount) => {
  const gstRate = 0.18;
  const convenienceChargeRate = 0.05;

  const originalAmount =
    totalAmount *
    0.8130081300813008130081300813008130081300813008130081300813008130081300813;

  const gstAdded = originalAmount * gstRate;

  const convenienceChargesAdded =
    (originalAmount + gstAdded) * convenienceChargeRate;

  return {
    originalAmount: originalAmount,
    gstAdded: gstAdded,
    convenienceChargesAdded: convenienceChargesAdded,
  };
};
