!async function(a=0,e=10){ids=await getIds(),ids?(infoItem=await infoItemIds(ids.slice(a,e)),infoItem?writeData(infoItem):alert("Error loading news, please try again later.")):alert("Error loading news, please try again later.")}();