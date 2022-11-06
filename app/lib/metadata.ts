export default {
  spirit: {
    total_sols: 2118, // rg -c -e "\"\d+\"" ./static/Spirit.json
    last_sol: 2208,
    total_photos: 128516, // rg -c "https://" ./static/Spirit.json
  },
  opportunity: {
    total_sols: 4811, // rg -c -e "\"\d+\"" ./static/Opportunity.json
    last_sol: 5111,
    total_photos: 228298, // rg -c "https://" ./static/Opportunity.json
  },
};
