export default function getUniqueDateData(weatherDataList) {
  const uniqueDates = [];
  const uniqueDateData = [];
  // Loop through the list to extract unique date entries
  for (let i = 0; i < weatherDataList.length; i++) {
    const dateTime = weatherDataList[i].dt_txt;
    
    // Extract the date part (YYYY-MM-DD) from dt_txt
    const date = dateTime.split(' ')[0];

    // Add the full entry to uniqueDateData if its date is not already in the list
    if (!uniqueDates.includes(date)) {
      uniqueDates.push(date);         // Keep track of the date
      uniqueDateData.push(weatherDataList[i]);  // Store the full data entry
    }
    // length 6 because first [0] will be the current day
    if(uniqueDateData.length === 6){
      break;
    }
  }
  

  return uniqueDateData.splice(1);
}
