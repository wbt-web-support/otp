const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const twilio = require('twilio');
const cors = require('cors'); // Import the CORS package
const rateLimit = require('express-rate-limit'); // Import the rate limiter package
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); 

// Rate limiter middleware
const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 15 minutes
    max: 6000, // limit each IP to 3 requests per windowMs
    message: { success: false, error: 'Too many OTP requests from this IP, please try again after 15 minutes' }
});

app.post('/phone-verification/send-otp', limiter, (req, res) => {
    const { phone, clientName } = req.body;
    let accountSid;
    let authToken;
    let verifyServiceSid;

    switch (clientName) {
          case "ISES":
            accountSid = process.env.ISES_ACCOUNT_SID;
            authToken = process.env.ISES_AUTH_TOKEN;
            verifyServiceSid = process.env.ISES_VERIFY_SERVICE_ID;
            break;
            
        case "NUHOME":
            accountSid = process.env.NUHOME_ACCOUNT_SID;
            authToken = process.env.NUHOME_AUTH_TOKEN;
            verifyServiceSid = process.env.NUHOME_VERIFY_SERVICE_ID;
            break;
       
        case "BoilerBase":
            accountSid = process.env.BoilerBase_ACCOUNT_SID;
            authToken = process.env.BoilerBase_AUTH_TOKEN;
            verifyServiceSid = process.env.BoilerBase_VERIFY_SERVICE_ID;
            break;
        case "OPTECGROUP":
            accountSid = process.env.OPTECGROUP_ACCOUNT_SID;
            authToken = process.env.OPTECGROUP_AUTH_TOKEN;
            verifyServiceSid = process.env.OPTECGROUP_VERIFY_SERVICE_ID;
            break;
        case "RHW":
            accountSid = process.env.RHW_ACCOUNT_SID;
            authToken = process.env.RHW_AUTH_TOKEN;
            verifyServiceSid = process.env.RHW_VERIFY_SERVICE_ID;
            break;
            
        case "ROSEWOOD":
            accountSid = process.env.ROSEWOOD_ACCOUNT_SID;
            authToken = process.env.ROSEWOOD_AUTH_TOKEN;
            verifyServiceSid = process.env.ROSEWOOD_VERIFY_SERVICE_ID;
            break;
        case "SASTAGAS":
            accountSid = process.env.SASTAGAS_ACCOUNT_SID;
            authToken = process.env.SASTAGAS_AUTH_TOKEN;
            verifyServiceSid = process.env.SASTAGAS_VERIFY_SERVICE_ID;
            break;
        case "ARCHWAYBOILERS":
            accountSid = process.env.ARCHWAYBOILERS_ACCOUNT_SID;
            authToken = process.env.ARCHWAYBOILERS_AUTH_TOKEN;
            verifyServiceSid = process.env.ARCHWAYBOILERS_VERIFY_SERVICE_ID;
            break;
        case "ACF":
            accountSid = process.env.ACF_ACCOUNT_SID;
            authToken = process.env.ACF_AUTH_TOKEN;
            verifyServiceSid = process.env.ACF_VERIFY_SERVICE_ID;
            break;
        case "BOILERSURE":
            accountSid = process.env.BOILERSURE_ACCOUNT_SID;
            authToken = process.env.BOILERSURE_AUTH_TOKEN;
            verifyServiceSid = process.env.BOILERSURE_VERIFY_SERVICE_ID;
            break;
         case "HALE":
            accountSid = process.env.HALE_ACCOUNT_SID;
            authToken = process.env.HALE_AUTH_TOKEN;
            verifyServiceSid = process.env.HALE_VERIFY_SERVICE_ID;
            break;
         case "KENTISH":
            accountSid = process.env.KENTISH_ACCOUNT_SID;
            authToken = process.env.KENTISH_AUTH_TOKEN;
            verifyServiceSid = process.env.KENTISH_VERIFY_SERVICE_ID;
            break;
         case "MCINNES":
            accountSid = process.env.MCINNES_ACCOUNT_SID;
            authToken = process.env.MCINNES_AUTH_TOKEN;
            verifyServiceSid = process.env.MCINNES_VERIFY_SERVICE_ID;
            break;
         case "NEXGEN":
            accountSid = process.env.NEXGEN_ACCOUNT_SID;
            authToken = process.env.NEXGEN_AUTH_TOKEN;
            verifyServiceSid = process.env.NEXGEN_VERIFY_SERVICE_ID;
            break;
        case "ORIGIN":
            accountSid = process.env.ORIGIN_ACCOUNT_SID;
            authToken = process.env.ORIGIN_AUTH_TOKEN;
            verifyServiceSid = process.env.ORIGIN_VERIFY_SERVICE_ID;
            break;
        case "RMD":
            accountSid = process.env.RMD_ACCOUNT_SID;
            authToken = process.env.RMD_AUTH_TOKEN;
            verifyServiceSid = process.env.RMD_VERIFY_SERVICE_ID;
            break;
        case "BEXHILL":
            accountSid = process.env.BEXHILL_ACCOUNT_SID;
            authToken = process.env.BEXHILL_AUTH_TOKEN;
            verifyServiceSid = process.env.BEXHILL_VERIFY_SERVICE_ID;
            break;
        case "GJM":
            accountSid = process.env.GJM_ACCOUNT_SID;
            authToken = process.env.GJM_AUTH_TOKEN;
            verifyServiceSid = process.env.GJM_VERIFY_SERVICE_ID;
            break;
        case "WARMCARE":
            accountSid = process.env.WARMCARE_ACCOUNT_SID;
            authToken = process.env.WARMCARE_AUTH_TOKEN;
            verifyServiceSid = process.env.WARMCARE_VERIFY_SERVICE_ID;
            break;
        case "STOAKE":
            accountSid = process.env.STOAKE_ACCOUNT_SID;
            authToken = process.env.STOAKE_AUTH_TOKEN;
            verifyServiceSid = process.env.STOAKE_VERIFY_SERVICE_ID;
            break;
        case "BOILERABLE":
            accountSid = process.env.BOILERABLE_ACCOUNT_SID;
            authToken = process.env.BOILERABLE_AUTH_TOKEN;
            verifyServiceSid = process.env.BOILERABLE_VERIFY_SERVICE_ID;
            break;
        case "SHROPSHIRE":
            accountSid = process.env.SHROPSHIRE_ACCOUNT_SID;
            authToken = process.env.SHROPSHIRE_AUTH_TOKEN;
            verifyServiceSid = process.env.SHROPSHIRE_VERIFY_SERVICE_ID;
            break;
        case "TRSCOOLING":
            accountSid = process.env.TRSCOOLING_ACCOUNT_SID;
            authToken = process.env.TRSCOOLING_AUTH_TOKEN;
            verifyServiceSid = process.env.TRSCOOLING_VERIFY_SERVICE_ID;
            break;
        case "ANKEDAMP":
            accountSid = process.env.ANKEDAMP_ACCOUNT_SID;
            authToken = process.env.ANKEDAMP_AUTH_TOKEN;
            verifyServiceSid = process.env.ANKEDAMP_VERIFY_SERVICE_ID;
            break;
        case "ALLSPARKWORKS":
            accountSid = process.env.ALLSPARKWORKS_ACCOUNT_SID;
            authToken = process.env.ALLSPARKWORKS_AUTH_TOKEN;
            verifyServiceSid = process.env.ALLSPARKWORKS_VERIFY_SERVICE_ID;
            break;
        
        case "HYDEELECTRICALDIVISION":
            accountSid = process.env.HYDEELECTRICALDIVISION_ACCOUNT_SID;
            authToken = process.env.HYDEELECTRICALDIVISION_AUTH_TOKEN;
            verifyServiceSid = process.env.HYDEELECTRICALDIVISION_VERIFY_SERVICE_ID;
            break;
        case "UKGASGROUP":
            accountSid = process.env.UKGASGROUP_ACCOUNT_SID;
            authToken = process.env.UKGASGROUP_AUTH_TOKEN;
            verifyServiceSid = process.env.UKGASGROUP_VERIFY_SERVICE_ID;
            break;
        case "NORTHEASTRESIN":
            accountSid = process.env.NORTHEASTRESIN_ACCOUNT_SID;
            authToken = process.env.NORTHEASTRESIN_AUTH_TOKEN;
            verifyServiceSid = process.env.NORTHEASTRESIN_VERIFY_SERVICE_ID;
            break;
        case "TRSENERGY":
            accountSid = process.env.TRSENERGY_ACCOUNT_SID;
            authToken = process.env.TRSENERGY_AUTH_TOKEN;
            verifyServiceSid = process.env.TRSENERGY_VERIFY_SERVICE_ID;
            break;
        case "SHEFFIELDRENEWABLESERVICES":
            accountSid = process.env.SHEFFIELDRENEWABLESERVICES_ACCOUNT_SID;
            authToken = process.env.SHEFFIELDRENEWABLESERVICES_AUTH_TOKEN;
            verifyServiceSid = process.env.SHEFFIELDRENEWABLESERVICES_VERIFY_SERVICE_ID;
            break;
        case "CENTRALSCOTLANDELECTEICAL":
            accountSid = process.env.CENTRALSCOTLANDELECTEICAL_ACCOUNT_SID;
            authToken = process.env.CENTRALSCOTLANDELECTEICAL_AUTH_TOKEN;
            verifyServiceSid = process.env.CENTRALSCOTLANDELECTEICAL_VERIFY_SERVICE_ID;
            break;
        case "JASONFAHYHEATING":
            accountSid = process.env.JASONFAHYHEATING_ACCOUNT_SID;
            authToken = process.env.JASONFAHYHEATING_AUTH_TOKEN;
            verifyServiceSid = process.env.JASONFAHYHEATING_VERIFY_SERVICE_ID;
            break;
        case "DANLECSOLARANDEVCHARGERS":
            accountSid = process.env.DANLECSOLARANDEVCHARGERS_ACCOUNT_SID;
            authToken = process.env.DANLECSOLARANDEVCHARGERS_AUTH_TOKEN;
            verifyServiceSid = process.env.DANLECSOLARANDEVCHARGERS_VERIFY_SERVICE_ID;
            break;
        case "LFTELECTRICAL":
            accountSid = process.env.LFTELECTRICAL_ACCOUNT_SID;
            authToken = process.env.LFTELECTRICAL_AUTH_TOKEN;
            verifyServiceSid = process.env.LFTELECTRICAL_VERIFY_SERVICE_ID;
            break;
        case "WDIGROUP":
            accountSid = process.env.WDIGROUP_ACCOUNT_SID;
            authToken = process.env.WDIGROUP_AUTH_TOKEN;
            verifyServiceSid = process.env.WDIGROUP_VERIFY_SERVICE_ID;
            break;
        case "ECOBOILER":
            accountSid = process.env.ECOBOILER_ACCOUNT_SID;
            authToken = process.env.ECOBOILER_AUTH_TOKEN;
            verifyServiceSid = process.env.ECOBOILER_VERIFY_SERVICE_ID;
            break;
        case "CAPITALVOLT":
            accountSid = process.env.CAPITALVOLT_ACCOUNT_SID;
            authToken = process.env.CAPITALVOLT_AUTH_TOKEN;
            verifyServiceSid = process.env.CAPITALVOLT_VERIFY_SERVICE_ID;
            break;
            
        case "RAWMECHANICAL":
            accountSid = process.env.RAWMECHANICAL_ACCOUNT_SID;
            authToken = process.env.RAWMECHANICAL_AUTH_TOKEN;
            verifyServiceSid = process.env.RAWMECHANICAL_VERIFY_SERVICE_ID;
            break;
            
        case "RAPLUMBERS":
            accountSid = process.env.RAPLUMBERS_ACCOUNT_SID;
            authToken = process.env.RAPLUMBERS_AUTH_TOKEN;
            verifyServiceSid = process.env.RAPLUMBERS_VERIFY_SERVICE_ID;
            break;
            
        case "LONDONBOILER":
            accountSid = process.env.LONDONBOILER_ACCOUNT_SID;
            authToken = process.env.LONDONBOILER_AUTH_TOKEN;
            verifyServiceSid = process.env.LONDONBOILER_VERIFY_SERVICE_ID;
            break;
        case "LWPLUMBINGANDHEATINGSOLUTIONS":
            accountSid = process.env.LWPLUMBINGANDHEATINGSOLUTIONS_ACCOUNT_SID;
            authToken = process.env.LWPLUMBINGANDHEATINGSOLUTIONS_AUTH_TOKEN;
            verifyServiceSid = process.env.LWPLUMBINGANDHEATINGSOLUTIONS_VERIFY_SERVICE_ID;
            break;
        case "LJNORTON":
            accountSid = process.env.LJNORTON_ACCOUNT_SID;
            authToken = process.env.LJNORTON_AUTH_TOKEN;
            verifyServiceSid = process.env.LJNORTON_VERIFY_SERVICE_ID;
            break;
        case "MPSHEATING":
            accountSid = process.env.MPSHEATING_ACCOUNT_SID;
            authToken = process.env.MPSHEATING_AUTH_TOKEN;
            verifyServiceSid = process.env.MPSHEATING_VERIFY_SERVICE_ID;
            break;
        case "GDRELECTRICAL":
            accountSid = process.env.GDRELECTRICAL_ACCOUNT_SID;
            authToken = process.env.GDRELECTRICAL_AUTH_TOKEN;
            verifyServiceSid = process.env.GDRELECTRICAL_VERIFY_SERVICE_ID;
            break;
        case "ECOHOME":
            accountSid = process.env.ECOHOME_ACCOUNT_SID;
            authToken = process.env.ECOHOME_AUTH_TOKEN;
            verifyServiceSid = process.env.ECOHOME_VERIFY_SERVICE_ID;
            break;
        case "ONESERVLTD":
            accountSid = process.env.ONESERVLTD_ACCOUNT_SID;
            authToken = process.env.ONESERVLTD_AUTH_TOKEN;
            verifyServiceSid = process.env.ONESERVLTD_VERIFY_SERVICE_ID;
            break;
        case "WMENERGY":
            accountSid = process.env.WMENERGY_ACCOUNT_SID;
            authToken = process.env.WMENERGY_AUTH_TOKEN;
            verifyServiceSid = process.env.WMENERGY_VERIFY_SERVICE_ID;
            break;
        case "VACASERVICES":
            accountSid = process.env.VACASERVICES_ACCOUNT_SID;
            authToken = process.env.VACASERVICES_AUTH_TOKEN;
            verifyServiceSid = process.env.VACASERVICES_VERIFY_SERVICE_ID;
            break;
        case "APVHEATINGSERVICES":
            accountSid = process.env.APVHEATINGSERVICES_ACCOUNT_SID;
            authToken = process.env.APVHEATINGSERVICES_AUTH_TOKEN;
            verifyServiceSid = process.env.APVHEATINGSERVICES_VERIFY_SERVICE_ID;
            break;
        case "HEATLINC":
            accountSid = process.env.HEATLINC_ACCOUNT_SID;
            authToken = process.env.HEATLINC_AUTH_TOKEN;
            verifyServiceSid = process.env.HEATLINC_VERIFY_SERVICE_ID;
            break;
        case "GASSERVICES":
            accountSid = process.env.GASSERVICES_ACCOUNT_SID;
            authToken = process.env.GASSERVICES_AUTH_TOKEN;
            verifyServiceSid = process.env.GASSERVICES_VERIFY_SERVICE_ID;
            break;
        case "ANWYLHEATINGSERVICES":
            accountSid = process.env.ANWYLHEATINGSERVICES_ACCOUNT_SID;
            authToken = process.env.ANWYLHEATINGSERVICES_AUTH_TOKEN;
            verifyServiceSid = process.env.ANWYLHEATINGSERVICES_VERIFY_SERVICE_ID;
            break;
        case "HOMEXE":
            accountSid = process.env.HOMEXE_ACCOUNT_SID;
            authToken = process.env.HOMEXE_AUTH_TOKEN;
            verifyServiceSid = process.env.HOMEXE_VERIFY_SERVICE_ID;
            break;
        case "ADAHOMESOLUTIONS":
            accountSid = process.env.ADAHOMESOLUTIONS_ACCOUNT_SID;
            authToken = process.env.ADAHOMESOLUTIONS_AUTH_TOKEN;
            verifyServiceSid = process.env.ADAHOMESOLUTIONS_VERIFY_SERVICE_ID;
            break;
            
        case "APH":
            accountSid = process.env.APH_ACCOUNT_SID;
            authToken = process.env.APH_AUTH_TOKEN;
            verifyServiceSid = process.env.APH_VERIFY_SERVICE_ID;
            break;
        case "SRW":
            accountSid = process.env.SRW_ACCOUNT_SID;
            authToken = process.env.SRW_AUTH_TOKEN;
            verifyServiceSid = process.env.SRW_VERIFY_SERVICE_ID;
            break;
            
        case "JBPLUMBING":
            accountSid = process.env.JBPLUMBING_ACCOUNT_SID;
            authToken = process.env.JBPLUMBING_AUTH_TOKEN;
            verifyServiceSid = process.env.JBPLUMBING_VERIFY_SERVICE_ID;
            break;
        case "PEGASUS":
            accountSid = process.env.PEGASUS_ACCOUNT_SID;
            authToken = process.env.PEGASUS_AUTH_TOKEN;
            verifyServiceSid = process.env.PEGASUS_VERIFY_SERVICE_ID;
            break;
        case "METEGAS":
            accountSid = process.env.METEGAS_ACCOUNT_SID;
            authToken = process.env.METEGAS_AUTH_TOKEN;
            verifyServiceSid = process.env.METEGAS_VERIFY_SERVICE_ID;
            break;
        case "EVOLUTIONENTRANCESYSTEM":
            accountSid = process.env.EVOLUTIONENTRANCESYSTEM_ACCOUNT_SID;
            authToken = process.env.EVOLUTIONENTRANCESYSTEM_AUTH_TOKEN;
            verifyServiceSid = process.env.EVOLUTIONENTRANCESYSTEM_VERIFY_SERVICE_ID;
            break;
        case "SWINTON":
            accountSid = process.env.SWINTON_ACCOUNT_SID;
            authToken = process.env.SWINTON_AUTH_TOKEN;
            verifyServiceSid = process.env.SWINTON_VERIFY_SERVICE_ID;
            break;
        case "MULTICO":
            accountSid = process.env.MULTICO_ACCOUNT_SID;
            authToken = process.env.MULTICO_AUTH_TOKEN;
            verifyServiceSid = process.env.MULTICO_VERIFY_SERVICE_ID;
            break;
        case "AVCOMM":
            accountSid = process.env.AVCOMM_ACCOUNT_SID;
            authToken = process.env.AVCOMM_AUTH_TOKEN;
            verifyServiceSid = process.env.AVCOMM_VERIFY_SERVICE_ID;
            break;
        case "BEATRIXHOME":
            accountSid = process.env.BEATRIXHOME_ACCOUNT_SID;
            authToken = process.env.BEATRIXHOME_AUTH_TOKEN;
            verifyServiceSid = process.env.BEATRIXHOME_VERIFY_SERVICE_ID;
            break;
        case "PLUMBRITE":
            accountSid = process.env.PLUMBRITE_ACCOUNT_SID;
            authToken = process.env.PLUMBRITE_AUTH_TOKEN;
            verifyServiceSid = process.env.PLUMBRITE_VERIFY_SERVICE_ID;
            break;
        case "ECOFUELED":
            accountSid = process.env.ECOFUELED_ACCOUNT_SID;
            authToken = process.env.ECOFUELED_AUTH_TOKEN;
            verifyServiceSid = process.env.ECOFUELED_VERIFY_SERVICE_ID;
            break;
        case "ARKBoiler":
            accountSid = process.env.ARKBoiler_ACCOUNT_SID;
            authToken = process.env.ARKBoiler_AUTH_TOKEN;
            verifyServiceSid = process.env.ARKBoiler_VERIFY_SERVICE_ID;
            break; 
        case "HASE":
            accountSid = process.env.HASE_ACCOUNT_SID;
            authToken = process.env.HASE_AUTH_TOKEN;
            verifyServiceSid = process.env.HASE_VERIFY_SERVICE_ID;
            break;
        case "GASTEKHOME":
            accountSid = process.env.GASTEKHOME_ACCOUNT_SID;
            authToken = process.env.GASTEKHOME_AUTH_TOKEN;
            verifyServiceSid = process.env.GASTEKHOME_VERIFY_SERVICE_ID;
            break;   
        case "STRONGEHOMES":
            accountSid = process.env.STRONGEHOMES_ACCOUNT_SID;
            authToken = process.env.STRONGEHOMES_AUTH_TOKEN;
            verifyServiceSid = process.env.STRONGEHOMES_VERIFY_SERVICE_ID;
            break;    
          case "SOPHIEGILL":
            accountSid = process.env.SOPHIEGILL_ACCOUNT_SID;
            authToken = process.env.SOPHIEGILL_AUTH_TOKEN;
            verifyServiceSid = process.env.SOPHIEGILL_VERIFY_SERVICE_ID;
            break;       
         case "HEATSERV":
            accountSid = process.env.HEATSERV_ACCOUNT_SID;
            authToken = process.env.HEATSERV_AUTH_TOKEN;
            verifyServiceSid = process.env.HEATSERV_VERIFY_SERVICE_ID;
            break;
        case "PLUMBINGHOT":
            accountSid = process.env.PLUMBINGHOT_ACCOUNT_SID;
            authToken = process.env.PLUMBINGHOT_AUTH_TOKEN;
            verifyServiceSid = process.env.PLUMBINGHOT_VERIFY_SERVICE_ID;
            break;
        case "MIDLAND":
            accountSid = process.env.MIDLAND_ACCOUNT_SID;
            authToken = process.env.MIDLAND_AUTH_TOKEN;
            verifyServiceSid = process.env.MIDLAND_VERIFY_SERVICE_ID;
            break;  
        case "ESSEX":
            accountSid = process.env.ESSEX_ACCOUNT_SID;
            authToken = process.env.ESSEX_AUTH_TOKEN;
            verifyServiceSid = process.env.ESSEX_VERIFY_SERVICE_ID;
            break; 
         case "PRIORITY":
            accountSid = process.env.PRIORITY_ACCOUNT_SID;
            authToken = process.env.PRIORITY_AUTH_TOKEN;
            verifyServiceSid = process.env.PRIORITY_VERIFY_SERVICE_ID;
            break;  
        case "RBELECTRICAL":
            accountSid = process.env.RBELECTRICAL_ACCOUNT_SID;
            authToken = process.env.RBELECTRICAL_AUTH_TOKEN;
            verifyServiceSid = process.env.RBELECTRICAL_VERIFY_SERVICE_ID;
            break;
         case "KJGROUP":
            accountSid = process.env.KJGROUP_ACCOUNT_SID;
            authToken = process.env.KJGROUP_AUTH_TOKEN;
            verifyServiceSid = process.env.KJGROUP_VERIFY_SERVICE_ID;
            break;  
        case "LOCKANDLINDFIELD":
            accountSid = process.env.LOCKANDLINDFIELD_ACCOUNT_SID;
            authToken = process.env.LOCKANDLINDFIELD_AUTH_TOKEN;
            verifyServiceSid = process.env.LOCKANDLINDFIELD_VERIFY_SERVICE_ID;
            break;   
        case "BOILERCOMPANY":
            accountSid = process.env.BOILERCOMPANY_ACCOUNT_SID;
            authToken = process.env.BOILERCOMPANY_AUTH_TOKEN;
            verifyServiceSid = process.env.BOILERCOMPANY_VERIFY_SERVICE_ID;
            break;  
        case "MYGREENENERGY":
            accountSid = process.env.MYGREENENERGY_ACCOUNT_SID;
            authToken = process.env.MYGREENENERGY_AUTH_TOKEN;
            verifyServiceSid = process.env.MYGREENENERGY_VERIFY_SERVICE_ID;
            break;   
        case "ADAPTMYHOME":
            accountSid = process.env.ADAPTMYHOME_ACCOUNT_SID;
            authToken = process.env.ADAPTMYHOME_AUTH_TOKEN;
            verifyServiceSid = process.env.ADAPTMYHOME_VERIFY_SERVICE_ID;
            break;
         case "INVERHEAT":
            accountSid = process.env.INVERHEAT_ACCOUNT_SID;
            authToken = process.env.INVERHEAT_AUTH_TOKEN;
            verifyServiceSid = process.env.INVERHEAT_VERIFY_SERVICE_ID;
            break;
        case "CAFGAS":
            accountSid = process.env.CAFGAS_ACCOUNT_SID;
            authToken = process.env.CAFGAS_AUTH_TOKEN;
            verifyServiceSid = process.env.CAFGAS_VERIFY_SERVICE_ID;
            break;
        case "EVPOWERPOINT":
            accountSid = process.env.EVPOWERPOINT_ACCOUNT_SID;
            authToken = process.env.EVPOWERPOINT_AUTH_TOKEN;
            verifyServiceSid = process.env.EVPOWERPOINT_VERIFY_SERVICE_ID;
            break;
        case "ECOMOTIVE":
            accountSid = process.env.ECOMOTIVE_ACCOUNT_SID;
            authToken = process.env.ECOMOTIVE_AUTH_TOKEN;
            verifyServiceSid = process.env.ECOMOTIVE_VERIFY_SERVICE_ID;
            break;  
        case "HALLSURFACING":
            accountSid = process.env.HALLSURFACING_ACCOUNT_SID;
            authToken = process.env.HALLSURFACING_AUTH_TOKEN;
            verifyServiceSid = process.env.HALLSURFACING_VERIFY_SERVICE_ID;
            break; 
        case "THAMESVALLEY":
            accountSid = process.env.THAMESVALLEY_ACCOUNT_SID;
            authToken = process.env.THAMESVALLEY_AUTH_TOKEN;
            verifyServiceSid = process.env.THAMESVALLEY_VERIFY_SERVICE_ID;
            break;
         case "BEEECO":
            accountSid = process.env.BEEECO_ACCOUNT_SID;
            authToken = process.env.BEEECO_AUTH_TOKEN;
            verifyServiceSid = process.env.BEEECO_VERIFY_SERVICE_ID;
            break; 
          case "WeBuildTrades":
            accountSid = process.env.WeBuildTrades_ACCOUNT_SID;
            authToken = process.env.WeBuildTrades_AUTH_TOKEN;
            verifyServiceSid = process.env.WeBuildTrades_VERIFY_SERVICE_ID;
            break;
        case "fortiselectrical":
            accountSid = process.env.fortiselectrical_ACCOUNT_SID;
            authToken = process.env.fortiselectrical_AUTH_TOKEN;
            verifyServiceSid = process.env.fortiselectrical_VERIFY_SERVICE_ID;
            break;
        case "debonair":
            accountSid = process.env.debonair_ACCOUNT_SID;
            authToken = process.env.debonair_AUTH_TOKEN;
            verifyServiceSid = process.env.debonair_VERIFY_SERVICE_ID;
            break;
        case "APEXEnergy":
            accountSid = process.env.APEXEnergy_ACCOUNT_SID;
            authToken = process.env.APEXEnergy_AUTH_TOKEN;
            verifyServiceSid = process.env.APEXEnergy_VERIFY_SERVICE_ID;
            break;
         case "TMS":
            accountSid = process.env.TMS_ACCOUNT_SID;
            authToken = process.env.TMS_AUTH_TOKEN;
            verifyServiceSid = process.env.TMS_VERIFY_SERVICE_ID;
            break;
        case "ddjheating":
            accountSid = process.env.ddjheating_ACCOUNT_SID;
            authToken = process.env.ddjheating_AUTH_TOKEN;
            verifyServiceSid = process.env.ddjheating_VERIFY_SERVICE_ID;
            break;
          case "Amersham":
            accountSid = process.env.Amersham_ACCOUNT_SID;
            authToken = process.env.Amersham_AUTH_TOKEN;
            verifyServiceSid = process.env.Amersham_VERIFY_SERVICE_ID;
            break;
         case "centrona":
            accountSid = process.env.centrona_ACCOUNT_SID;
            authToken = process.env.centrona_AUTH_TOKEN;
            verifyServiceSid = process.env.centrona_VERIFY_SERVICE_ID;
            break;
        case "Suntec":
            accountSid = process.env.Suntec_ACCOUNT_SID;
            authToken = process.env.Suntec_AUTH_TOKEN;
            verifyServiceSid = process.env.Suntec_VERIFY_SERVICE_ID;
            break;
        case "Kennet":
            accountSid = process.env.Kennet_ACCOUNT_SID;
            authToken = process.env.Kennet_AUTH_TOKEN;
            verifyServiceSid = process.env.Kennet_VERIFY_SERVICE_ID;
            break;
        case "coreplumbing":
            accountSid = process.env.coreplumbing_ACCOUNT_SID;
            authToken = process.env.coreplumbing_AUTH_TOKEN;
            verifyServiceSid = process.env.coreplumbing_VERIFY_SERVICE_ID;
            break;
        case "stewart":
            accountSid = process.env.stewart_ACCOUNT_SID;
            authToken = process.env.stewart_AUTH_TOKEN;
            verifyServiceSid = process.env.stewart_VERIFY_SERVICE_ID;
            break;
        case "Jawgas":
            accountSid = process.env.Jawgas_ACCOUNT_SID;
            authToken = process.env.Jawgas_AUTH_TOKEN;
            verifyServiceSid = process.env.Jawgas_VERIFY_SERVICE_ID;
            break;
        case "ZNS":
            accountSid = process.env.ZNS_ACCOUNT_SID;
            authToken = process.env.ZNS_AUTH_TOKEN;
            verifyServiceSid = process.env.ZNS_VERIFY_SERVICE_ID;
            break;
         case "VALLEYGAS":
            accountSid = process.env.VALLEYGAS_ACCOUNT_SID;
            authToken = process.env.VALLEYGAS_AUTH_TOKEN;
            verifyServiceSid = process.env.VALLEYGAS_VERIFY_SERVICE_ID;
            break;    
        case "SUPERIOR":
            accountSid = process.env.SUPERIOR_ACCOUNT_SID;
            authToken = process.env.SUPERIOR_AUTH_TOKEN;
            verifyServiceSid = process.env.SUPERIOR_VERIFY_SERVICE_ID;
            break;
        case "IanReid":
            accountSid = process.env.IanReid_ACCOUNT_SID;
            authToken = process.env.IanReid_AUTH_TOKEN;
            verifyServiceSid = process.env.IanReid_VERIFY_SERVICE_ID;
            break;
        case "ACTIMART":
            accountSid = process.env.ACTIMART_ACCOUNT_SID;
            authToken = process.env.ACTIMART_AUTH_TOKEN;
            verifyServiceSid = process.env.ACTIMART_VERIFY_SERVICE_ID;
            break;
        case "discoversolar":
            accountSid = process.env.discoversolar_ACCOUNT_SID;
            authToken = process.env.discoversolar_AUTH_TOKEN;
            verifyServiceSid = process.env.discoversolar_VERIFY_SERVICE_ID;
            break;
        case "maxsolar":
            accountSid = process.env.maxsolar_ACCOUNT_SID;
            authToken = process.env.maxsolar_AUTH_TOKEN;
            verifyServiceSid = process.env.maxsolar_VERIFY_SERVICE_ID;
            break;
        case "energysaving":
            accountSid = process.env.energysaving_ACCOUNT_SID;
            authToken = process.env.energysaving_AUTH_TOKEN;
            verifyServiceSid = process.env.energysaving_VERIFY_SERVICE_ID;
            break;
        case "WYSE":
            accountSid = process.env.WYSE_ACCOUNT_SID;
            authToken = process.env.WYSE_AUTH_TOKEN;
            verifyServiceSid = process.env.WYSE_VERIFY_SERVICE_ID;
            break;
        case "Cheltenham":
            accountSid = process.env.Cheltenham_ACCOUNT_SID;
            authToken = process.env.Cheltenham_AUTH_TOKEN;
            verifyServiceSid = process.env.Cheltenham_VERIFY_SERVICE_ID;
            break;
        case "HUMBER":
            accountSid = process.env.HUMBER_ACCOUNT_SID;
            authToken = process.env.HUMBER_AUTH_TOKEN;
            verifyServiceSid = process.env.HUMBER_VERIFY_SERVICE_ID;
            break;
        case "prestige":
            accountSid = process.env.prestige_ACCOUNT_SID;
            authToken = process.env.prestige_AUTH_TOKEN;
            verifyServiceSid = process.env.prestige_VERIFY_SERVICE_ID;
            break;
            
        case "ARK":
            accountSid = process.env.ARK_ACCOUNT_SID;
            authToken = process.env.ARK_AUTH_TOKEN;
            verifyServiceSid = process.env.ARK_VERIFY_SERVICE_ID;
            break;
        case "Greenenergy":
            accountSid = process.env.Greenenergy_ACCOUNT_SID;
            authToken = process.env.Greenenergy_AUTH_TOKEN;
            verifyServiceSid = process.env.Greenenergy_VERIFY_SERVICE_ID;
            break;
        case "Alpha":
            accountSid = process.env.Alpha_ACCOUNT_SID;
            authToken = process.env.Alpha_AUTH_TOKEN;
            verifyServiceSid = process.env.Alpha_VERIFY_SERVICE_ID;
            break;
        case "PLUMBGUYS":
            accountSid = process.env.PLUMBGUYS_ACCOUNT_SID;
            authToken = process.env.PLUMBGUYS_AUTH_TOKEN;
            verifyServiceSid = process.env.PLUMBGUYS_VERIFY_SERVICE_ID;
            break;
        case "SJC":
            accountSid = process.env.SJC_ACCOUNT_SID;
            authToken = process.env.SJC_AUTH_TOKEN;
            verifyServiceSid = process.env.SJC_VERIFY_SERVICE_ID;
            break;
        case "ALBO":
            accountSid = process.env.ALBO_ACCOUNT_SID;
            authToken = process.env.ALBO_AUTH_TOKEN;
            verifyServiceSid = process.env.ALBO_VERIFY_SERVICE_ID;
            break;
        case "ALPHA":
            accountSid = process.env.ALPHA_ACCOUNT_SID;
            authToken = process.env.ALPHA_AUTH_TOKEN;
            verifyServiceSid = process.env.ALPHA_VERIFY_SERVICE_ID;
            break;
        case "MCB":
            accountSid = process.env.MCB_ACCOUNT_SID;
            authToken = process.env.MCB_AUTH_TOKEN;
            verifyServiceSid = process.env.MCB_VERIFY_SERVICE_ID;
            break;
         case "plumbingandrenewables":
            accountSid = process.env.plumbingandrenewables_ACCOUNT_SID;
            authToken = process.env.plumbingandrenewables_AUTH_TOKEN;
            verifyServiceSid = process.env.plumbingandrenewables_VERIFY_SERVICE_ID;
            break;
        case "burgess":
            accountSid = process.env.burgess_ACCOUNT_SID;
            authToken = process.env.burgess_AUTH_TOKEN;
            verifyServiceSid = process.env.burgess_VERIFY_SERVICE_ID;
            break;
        case "cbplumbing":
            accountSid = process.env.cbplumbing_ACCOUNT_SID;
            authToken = process.env.cbplumbing_AUTH_TOKEN;
            verifyServiceSid = process.env.cbplumbing_VERIFY_SERVICE_ID;
            break;
        case "dec":
            accountSid = process.env.dec_ACCOUNT_SID;
            authToken = process.env.dec_AUTH_TOKEN;
            verifyServiceSid = process.env.dec_VERIFY_SERVICE_ID;
            break;
        case "quantum":
            accountSid = process.env.quantum_ACCOUNT_SID;
            authToken = process.env.quantum_AUTH_TOKEN;
            verifyServiceSid = process.env.quantum_VERIFY_SERVICE_ID;
            break;
        case "Current":
            accountSid = process.env.Current_ACCOUNT_SID;
            authToken = process.env.Current_AUTH_TOKEN;
            verifyServiceSid = process.env.Current_VERIFY_SERVICE_ID;
            break;
        case "tyneandwear":
            accountSid = process.env.tyneandwear_ACCOUNT_SID;
            authToken = process.env.tyneandwear_AUTH_TOKEN;
            verifyServiceSid = process.env.tyneandwear_VERIFY_SERVICE_ID;
            break;
        case "southcoast":
            accountSid = process.env.southcoast_ACCOUNT_SID;
            authToken = process.env.southcoast_AUTH_TOKEN;
            verifyServiceSid = process.env.southcoast_VERIFY_SERVICE_ID;
            break;
        case "heatworks":
            accountSid = process.env.heatworks_ACCOUNT_SID;
            authToken = process.env.heatworks_AUTH_TOKEN;
            verifyServiceSid = process.env.heatworks_VERIFY_SERVICE_ID;
            break;
        case "heatseal":
            accountSid = process.env.heatseal_ACCOUNT_SID;
            authToken = process.env.heatseal_AUTH_TOKEN;
            verifyServiceSid = process.env.heatseal_VERIFY_SERVICE_ID;
            break;
        case "upgradehome":
            accountSid = process.env.upgradehome_ACCOUNT_SID;
            authToken = process.env.upgradehome_AUTH_TOKEN;
            verifyServiceSid = process.env.upgradehome_VERIFY_SERVICE_ID;
            break;
        case "realheating":
            accountSid = process.env.realheating_ACCOUNT_SID;
            authToken = process.env.realheating_AUTH_TOKEN;
            verifyServiceSid = process.env.realheating_VERIFY_SERVICE_ID;
            break;
        case "cdmech":
            accountSid = process.env.cdmech_ACCOUNT_SID;
            authToken = process.env.cdmech_AUTH_TOKEN;
            verifyServiceSid = process.env.cdmech_VERIFY_SERVICE_ID;
            break;
        case "keenan":
            accountSid = process.env.keenan_ACCOUNT_SID;
            authToken = process.env.keenan_AUTH_TOKEN;
            verifyServiceSid = process.env.keenan_VERIFY_SERVICE_ID;
            break;
        case "FRESHAIRSOLUTIONS":
            accountSid = process.env.FRESHAIRSOLUTIONS_ACCOUNT_SID;
            authToken = process.env.FRESHAIRSOLUTIONS_AUTH_TOKEN;
            verifyServiceSid = process.env.FRESHAIRSOLUTIONS_VERIFY_SERVICE_ID;
            break;
        case "Verdi":
            accountSid = process.env.Verdi_ACCOUNT_SID;
            authToken = process.env.Verdi_AUTH_TOKEN;
            verifyServiceSid = process.env.Verdi_VERIFY_SERVICE_ID;
            break;
        case "countyboilers":
            accountSid = process.env.countyboilers_ACCOUNT_SID;
            authToken = process.env.countyboilers_AUTH_TOKEN;
            verifyServiceSid = process.env.countyboilers_VERIFY_SERVICE_ID;
            break;
        case "acornpavin":
            accountSid = process.env.acornpavin_ACCOUNT_SID;
            authToken = process.env.acornpavin_AUTH_TOKEN;
            verifyServiceSid = process.env.acornpavin_VERIFY_SERVICE_ID;
            break;
        case "Heatr":
            accountSid = process.env.Heatr_ACCOUNT_SID;
            authToken = process.env.Heatr_AUTH_TOKEN;
            verifyServiceSid = process.env.Heatr_VERIFY_SERVICE_ID;
            break;
        case "northbound":
            accountSid = process.env.northbound_ACCOUNT_SID;
            authToken = process.env.northbound_AUTH_TOKEN;
            verifyServiceSid = process.env.northbound_VERIFY_SERVICE_ID;
            break;
        case "Worcestershire":
            accountSid = process.env.Worcestershire_ACCOUNT_SID;
            authToken = process.env.Worcestershire_AUTH_TOKEN;
            verifyServiceSid = process.env.Worcestershire_VERIFY_SERVICE_ID;
            break;
        case "shardwindows":
            accountSid = process.env.shardwindows_ACCOUNT_SID;
            authToken = process.env.shardwindows_AUTH_TOKEN;
            verifyServiceSid = process.env.shardwindows_VERIFY_SERVICE_ID;
            break;
        case "cambridgesolar":
            accountSid = process.env.cambridgesolar_ACCOUNT_SID;
            authToken = process.env.cambridgesolar_AUTH_TOKEN;
            verifyServiceSid = process.env.cambridgesolar_VERIFY_SERVICE_ID;
            break;
        case "csj":
            accountSid = process.env.csj_ACCOUNT_SID;
            authToken = process.env.csj_AUTH_TOKEN;
            verifyServiceSid = process.env.csj_VERIFY_SERVICE_ID;
            break;
        case "WBT":
            accountSid = process.env.WBT_ACCOUNT_SID;
            authToken = process.env.WBT_AUTH_TOKEN;
            verifyServiceSid = process.env.WBT_VERIFY_SERVICE_ID;
            break;
        case "proactive":
            accountSid = process.env.proactive_ACCOUNT_SID;
            authToken = process.env.proactive_AUTH_TOKEN;
            verifyServiceSid = process.env.proactive_VERIFY_SERVICE_ID;
            break;
        case "Evergreen":
            accountSid = process.env.Evergreen_ACCOUNT_SID;
            authToken = process.env.Evergreen_AUTH_TOKEN;
            verifyServiceSid = process.env.Evergreen_VERIFY_SERVICE_ID;
            break;
        case "jkcooling":
            accountSid = process.env.jkcooling_ACCOUNT_SID;
            authToken = process.env.jkcooling_AUTH_TOKEN;
            verifyServiceSid = process.env.jkcooling_VERIFY_SERVICE_ID;
            break;
        case "effectenergy":
            accountSid = process.env.effectenergy_ACCOUNT_SID;
            authToken = process.env.effectenergy_AUTH_TOKEN;
            verifyServiceSid = process.env.effectenergy_VERIFY_SERVICE_ID;
            break;
        case "Ashford":
            accountSid = process.env.Ashford_ACCOUNT_SID;
            authToken = process.env.Ashford_AUTH_TOKEN;
            verifyServiceSid = process.env.Ashford_VERIFY_SERVICE_ID;
            break;
        case "japlumbing":
            accountSid = process.env.japlumbing_ACCOUNT_SID;
            authToken = process.env.japlumbing_AUTH_TOKEN;
            verifyServiceSid = process.env.japlumbing_VERIFY_SERVICE_ID;
            break;
        case "Nuera":
            accountSid = process.env.Nuera_ACCOUNT_SID;
            authToken = process.env.Nuera_AUTH_TOKEN;
            verifyServiceSid = process.env.Nuera_VERIFY_SERVICE_ID;
            break;
        case "HHE":
            accountSid = process.env.HHE_ACCOUNT_SID;
            authToken = process.env.HHE_AUTH_TOKEN;
            verifyServiceSid = process.env.HHE_VERIFY_SERVICE_ID;
            break;
        case "cooper":
            accountSid = process.env.cooper_ACCOUNT_SID;
            authToken = process.env.cooper_AUTH_TOKEN;
            verifyServiceSid = process.env.cooper_VERIFY_SERVICE_ID;
            break;
        case "NuGen":
            accountSid = process.env.NuGen_ACCOUNT_SID;
            authToken = process.env.NuGen_AUTH_TOKEN;
            verifyServiceSid = process.env.NuGen_VERIFY_SERVICE_ID;
            break;
        case "Roofing":
            accountSid = process.env.Roofing_ACCOUNT_SID;
            authToken = process.env.Roofing_AUTH_TOKEN;
            verifyServiceSid = process.env.Roofing_VERIFY_SERVICE_ID;
            break;
        case "GoKonnect":
            accountSid = process.env.GoKonnect_ACCOUNT_SID;
            authToken = process.env.GoKonnect_AUTH_TOKEN;
            verifyServiceSid = process.env.GoKonnect_VERIFY_SERVICE_ID;
            break;
        case "optimalcooling":
            accountSid = process.env.optimalcooling_ACCOUNT_SID;
            authToken = process.env.optimalcooling_AUTH_TOKEN;
            verifyServiceSid = process.env.optimalcooling_VERIFY_SERVICE_ID;
            break;
        case "holgateelectrical":
            accountSid = process.env.holgateelectrical_ACCOUNT_SID;
            authToken = process.env.holgateelectrical_AUTH_TOKEN;
            verifyServiceSid = process.env.holgateelectrical_VERIFY_SERVICE_ID;
            break;
        case "Berkshire":
            accountSid = process.env.Berkshire_ACCOUNT_SID;
            authToken = process.env.Berkshire_AUTH_TOKEN;
            verifyServiceSid = process.env.Berkshire_VERIFY_SERVICE_ID;
            break;
        case "Keystone":
            accountSid = process.env.Keystone_ACCOUNT_SID;
            authToken = process.env.Keystone_AUTH_TOKEN;
            verifyServiceSid = process.env.Keystone_VERIFY_SERVICE_ID;
            break;
        case "oakwood":
            accountSid = process.env.oakwood_ACCOUNT_SID;
            authToken = process.env.oakwood_AUTH_TOKEN;
            verifyServiceSid = process.env.oakwood_VERIFY_SERVICE_ID;
            break;
        
        default:
            accountSid = "";
    }

    if (accountSid === "" || authToken === "") {
        res.json({ success: false, error: "client name not found", phoneNumber: phone, clientname: clientName });
        return;
    }

    const client = twilio(accountSid, authToken);

    client.verify.v2.services(verifyServiceSid)
        .verifications
        .create({ to: phone, channel: 'sms' })
        .then(verification => res.json({ success: true }))
        .catch(error => {
            console.error('Error sending OTP:', error);
            res.json({ success: false, error });
        });
});

app.post('/phone-verification/verify-otp', (req, res) => {
    const { phone, otp, clientName } = req.body;
    let accountSid;
    let authToken;
    let verifyServiceSid;

    switch (clientName) {
        
          case "ISES":  
            accountSid = process.env.ISES_ACCOUNT_SID;
            authToken = process.env.ISES_AUTH_TOKEN;
            verifyServiceSid = process.env.ISES_VERIFY_SERVICE_ID;
            break; 
            
        case "NUHOME":
            accountSid = process.env.NUHOME_ACCOUNT_SID;
            authToken = process.env.NUHOME_AUTH_TOKEN;
            verifyServiceSid = process.env.NUHOME_VERIFY_SERVICE_ID;
            break;
        case "BoilerBase":
            accountSid = process.env.BoilerBase_ACCOUNT_SID;
            authToken = process.env.BoilerBase_AUTH_TOKEN;
            verifyServiceSid = process.env.BoilerBase_VERIFY_SERVICE_ID;
            break;
        case "OPTECGROUP":
            accountSid = process.env.OPTECGROUP_ACCOUNT_SID;
            authToken = process.env.OPTECGROUP_AUTH_TOKEN;
            verifyServiceSid = process.env.OPTECGROUP_VERIFY_SERVICE_ID;
            break;
        case "RHW":
            accountSid = process.env.RHW_ACCOUNT_SID;
            authToken = process.env.RHW_AUTH_TOKEN;
            verifyServiceSid = process.env.RHW_VERIFY_SERVICE_ID;
            break;
        case "ROSEWOOD":
            accountSid = process.env.ROSEWOOD_ACCOUNT_SID;
            authToken = process.env.ROSEWOOD_AUTH_TOKEN;
            verifyServiceSid = process.env.ROSEWOOD_VERIFY_SERVICE_ID;
            break;
            
        case "SASTAGAS":
            accountSid = process.env.SASTAGAS_ACCOUNT_SID;
            authToken = process.env.SASTAGAS_AUTH_TOKEN;
            verifyServiceSid = process.env.SASTAGAS_VERIFY_SERVICE_ID;
            break;
            
        case "ARCHWAYBOILERS":
            accountSid = process.env.ARCHWAYBOILERS_ACCOUNT_SID;
            authToken = process.env.ARCHWAYBOILERS_AUTH_TOKEN;
            verifyServiceSid = process.env.ARCHWAYBOILERS_VERIFY_SERVICE_ID;
            break;
        case "ACF":
            accountSid = process.env.ACF_ACCOUNT_SID;
            authToken = process.env.ACF_AUTH_TOKEN;
            verifyServiceSid = process.env.ACF_VERIFY_SERVICE_ID;
            break;
        case "BOILERSURE":
            accountSid = process.env.BOILERSURE_ACCOUNT_SID;
            authToken = process.env.BOILERSURE_AUTH_TOKEN;
            verifyServiceSid = process.env.BOILERSURE_VERIFY_SERVICE_ID;
            break;
         case "HALE":
            accountSid = process.env.HALE_ACCOUNT_SID;
            authToken = process.env.HALE_AUTH_TOKEN;
            verifyServiceSid = process.env.HALE_VERIFY_SERVICE_ID;
            break;
         case "KENTISH":
            accountSid = process.env.KENTISH_ACCOUNT_SID;
            authToken = process.env.KENTISH_AUTH_TOKEN;
            verifyServiceSid = process.env.KENTISH_VERIFY_SERVICE_ID;
            break;
         case "MCINNES":
            accountSid = process.env.MCINNES_ACCOUNT_SID;
            authToken = process.env.MCINNES_AUTH_TOKEN;
            verifyServiceSid = process.env.MCINNES_VERIFY_SERVICE_ID;
            break;
         case "NEXGEN":
            accountSid = process.env.NEXGEN_ACCOUNT_SID;
            authToken = process.env.NEXGEN_AUTH_TOKEN;
            verifyServiceSid = process.env.NEXGEN_VERIFY_SERVICE_ID;
            break;
        case "ORIGIN":
            accountSid = process.env.ORIGIN_ACCOUNT_SID;
            authToken = process.env.ORIGIN_AUTH_TOKEN;
            verifyServiceSid = process.env.ORIGIN_VERIFY_SERVICE_ID;
            break;
        case "RMD":
            accountSid = process.env.RMD_ACCOUNT_SID;
            authToken = process.env.RMD_AUTH_TOKEN;
            verifyServiceSid = process.env.RMD_VERIFY_SERVICE_ID;
            break;
        case "BEXHILL":
            accountSid = process.env.BEXHILL_ACCOUNT_SID;
            authToken = process.env.BEXHILL_AUTH_TOKEN;
            verifyServiceSid = process.env.BEXHILL_VERIFY_SERVICE_ID;
            break;
        case "GJM":
            accountSid = process.env.GJM_ACCOUNT_SID;
            authToken = process.env.GJM_AUTH_TOKEN;
            verifyServiceSid = process.env.GJM_VERIFY_SERVICE_ID;
            break;
            
        case "WARMCARE":
            accountSid = process.env.WARMCARE_ACCOUNT_SID;
            authToken = process.env.WARMCARE_AUTH_TOKEN;
            verifyServiceSid = process.env.WARMCARE_VERIFY_SERVICE_ID;
            break;
        case "STOAKE":
            accountSid = process.env.STOAKE_ACCOUNT_SID;
            authToken = process.env.STOAKE_AUTH_TOKEN;
            verifyServiceSid = process.env.STOAKE_VERIFY_SERVICE_ID;
            break;
            case "BOILERABLE":
            accountSid = process.env.BOILERABLE_ACCOUNT_SID;
            authToken = process.env.BOILERABLE_AUTH_TOKEN;
            verifyServiceSid = process.env.BOILERABLE_VERIFY_SERVICE_ID;
            break;
        case "SHROPSHIRE":
            accountSid = process.env.SHROPSHIRE_ACCOUNT_SID;
            authToken = process.env.SHROPSHIRE_AUTH_TOKEN;
            verifyServiceSid = process.env.SHROPSHIRE_VERIFY_SERVICE_ID;
            break;
        case "TRSCOOLING":
            accountSid = process.env.TRSCOOLING_ACCOUNT_SID;
            authToken = process.env.TRSCOOLING_AUTH_TOKEN;
            verifyServiceSid = process.env.TRSCOOLING_VERIFY_SERVICE_ID;
            break;
        case "ANKEDAMP":
            accountSid = process.env.ANKEDAMP_ACCOUNT_SID;
            authToken = process.env.ANKEDAMP_AUTH_TOKEN;
            verifyServiceSid = process.env.ANKEDAMP_VERIFY_SERVICE_ID;
            break;
        case "ALLSPARKWORKS":
            accountSid = process.env.ALLSPARKWORKS_ACCOUNT_SID;
            authToken = process.env.ALLSPARKWORKS_AUTH_TOKEN;
            verifyServiceSid = process.env.ALLSPARKWORKS_VERIFY_SERVICE_ID;
            break;
       
        case "HYDEELECTRICALDIVISION":
            accountSid = process.env.HYDEELECTRICALDIVISION_ACCOUNT_SID;
            authToken = process.env.HYDEELECTRICALDIVISION_AUTH_TOKEN;
            verifyServiceSid = process.env.HYDEELECTRICALDIVISION_VERIFY_SERVICE_ID;
            break;
        case "UKGASGROUP":
            accountSid = process.env.UKGASGROUP_ACCOUNT_SID;
            authToken = process.env.UKGASGROUP_AUTH_TOKEN;
            verifyServiceSid = process.env.UKGASGROUP_VERIFY_SERVICE_ID;
            break;
        case "NORTHEASTRESIN":
            accountSid = process.env.NORTHEASTRESIN_ACCOUNT_SID;
            authToken = process.env.NORTHEASTRESIN_AUTH_TOKEN;
            verifyServiceSid = process.env.NORTHEASTRESIN_VERIFY_SERVICE_ID;
            break;
        case "TRSENERGY":
            accountSid = process.env.TRSENERGY_ACCOUNT_SID;
            authToken = process.env.TRSENERGY_AUTH_TOKEN;
            verifyServiceSid = process.env.TRSENERGY_VERIFY_SERVICE_ID;
            break;
        case "SHEFFIELDRENEWABLESERVICES":
            accountSid = process.env.SHEFFIELDRENEWABLESERVICES_ACCOUNT_SID;
            authToken = process.env.SHEFFIELDRENEWABLESERVICES_AUTH_TOKEN;
            verifyServiceSid = process.env.SHEFFIELDRENEWABLESERVICES_VERIFY_SERVICE_ID;
            break;
        case "CENTRALSCOTLANDELECTEICAL":
            accountSid = process.env.CENTRALSCOTLANDELECTEICAL_ACCOUNT_SID;
            authToken = process.env.CENTRALSCOTLANDELECTEICAL_AUTH_TOKEN;
            verifyServiceSid = process.env.CENTRALSCOTLANDELECTEICAL_VERIFY_SERVICE_ID;
            break;
        case "JASONFAHYHEATING":
            accountSid = process.env.JASONFAHYHEATING_ACCOUNT_SID;
            authToken = process.env.JASONFAHYHEATING_AUTH_TOKEN;
            verifyServiceSid = process.env.JASONFAHYHEATING_VERIFY_SERVICE_ID;
            break;
        case "DANLECSOLARANDEVCHARGERS":
            accountSid = process.env.DANLECSOLARANDEVCHARGERS_ACCOUNT_SID;
            authToken = process.env.DANLECSOLARANDEVCHARGERS_AUTH_TOKEN;
            verifyServiceSid = process.env.DANLECSOLARANDEVCHARGERS_VERIFY_SERVICE_ID;
            break;
        case "LFTELECTRICAL":
            accountSid = process.env.LFTELECTRICAL_ACCOUNT_SID;
            authToken = process.env.LFTELECTRICAL_AUTH_TOKEN;
            verifyServiceSid = process.env.LFTELECTRICAL_VERIFY_SERVICE_ID;
            break;
        case "WDIGROUP":
            accountSid = process.env.WDIGROUP_ACCOUNT_SID;
            authToken = process.env.WDIGROUP_AUTH_TOKEN;
            verifyServiceSid = process.env.WDIGROUP_VERIFY_SERVICE_ID;
            break;
        case "ECOBOILER":
            accountSid = process.env.ECOBOILER_ACCOUNT_SID;
            authToken = process.env.ECOBOILER_AUTH_TOKEN;
            verifyServiceSid = process.env.ECOBOILER_VERIFY_SERVICE_ID;
            break;
        case "CAPITALVOLT":
            accountSid = process.env.CAPITALVOLT_ACCOUNT_SID;
            authToken = process.env.CAPITALVOLT_AUTH_TOKEN;
            verifyServiceSid = process.env.CAPITALVOLT_VERIFY_SERVICE_ID;
            break;
        case "RAPLUMBERS":
            accountSid = process.env.RAPLUMBERS_ACCOUNT_SID;
            authToken = process.env.RAPLUMBERS_AUTH_TOKEN;
            verifyServiceSid = process.env.RAPLUMBERS_VERIFY_SERVICE_ID;
            break;
        case "RAWMECHANICAL":
            accountSid = process.env.RAWMECHANICAL_ACCOUNT_SID;
            authToken = process.env.RAWMECHANICAL_AUTH_TOKEN;
            verifyServiceSid = process.env.RAWMECHANICAL_VERIFY_SERVICE_ID;
            break;
            
        case "LONDONBOILER":
            accountSid = process.env.LONDONBOILER_ACCOUNT_SID;
            authToken = process.env.LONDONBOILER_AUTH_TOKEN;
            verifyServiceSid = process.env.LONDONBOILER_VERIFY_SERVICE_ID;
            break;  
        case "LWPLUMBINGANDHEATINGSOLUTIONS":
            accountSid = process.env.LWPLUMBINGANDHEATINGSOLUTIONS_ACCOUNT_SID;
            authToken = process.env.LWPLUMBINGANDHEATINGSOLUTIONS_AUTH_TOKEN;
            verifyServiceSid = process.env.LWPLUMBINGANDHEATINGSOLUTIONS_VERIFY_SERVICE_ID;
            break;
        case "LJNORTON":
            accountSid = process.env.LJNORTON_ACCOUNT_SID;
            authToken = process.env.LJNORTON_AUTH_TOKEN;
            verifyServiceSid = process.env.LJNORTON_VERIFY_SERVICE_ID;
            break;
        case "MPSHEATING":
            accountSid = process.env.MPSHEATING_ACCOUNT_SID;
            authToken = process.env.MPSHEATING_AUTH_TOKEN;
            verifyServiceSid = process.env.MPSHEATING_VERIFY_SERVICE_ID;
            break;
        case "GDRELECTRICAL":
            accountSid = process.env.GDRELECTRICAL_ACCOUNT_SID;
            authToken = process.env.GDRELECTRICAL_AUTH_TOKEN;
            verifyServiceSid = process.env.GDRELECTRICAL_VERIFY_SERVICE_ID;
            break;
        case "ECOHOME":
            accountSid = process.env.ECOHOME_ACCOUNT_SID;
            authToken = process.env.ECOHOME_AUTH_TOKEN;
            verifyServiceSid = process.env.ECOHOME_VERIFY_SERVICE_ID;
            break;
        case "ONESERVLTD":
            accountSid = process.env.ONESERVLTD_ACCOUNT_SID;
            authToken = process.env.ONESERVLTD_AUTH_TOKEN;
            verifyServiceSid = process.env.ONESERVLTD_VERIFY_SERVICE_ID;
            break;
        case "WMENERGY":
            accountSid = process.env.WMENERGY_ACCOUNT_SID;
            authToken = process.env.WMENERGY_AUTH_TOKEN;
            verifyServiceSid = process.env.WMENERGY_VERIFY_SERVICE_ID;
            break;
        case "VACASERVICES":
            accountSid = process.env.VACASERVICES_ACCOUNT_SID;
            authToken = process.env.VACASERVICES_AUTH_TOKEN;
            verifyServiceSid = process.env.VACASERVICES_VERIFY_SERVICE_ID;
            break;
        case "APVHEATINGSERVICES":
            accountSid = process.env.APVHEATINGSERVICES_ACCOUNT_SID;
            authToken = process.env.APVHEATINGSERVICES_AUTH_TOKEN;
            verifyServiceSid = process.env.APVHEATINGSERVICES_VERIFY_SERVICE_ID;
            break;
        case "HEATLINC":
            accountSid = process.env.HEATLINC_ACCOUNT_SID;
            authToken = process.env.HEATLINC_AUTH_TOKEN;
            verifyServiceSid = process.env.HEATLINC_VERIFY_SERVICE_ID;
            break;
        case "GASSERVICES":
            accountSid = process.env.GASSERVICES_ACCOUNT_SID;
            authToken = process.env.GASSERVICES_AUTH_TOKEN;
            verifyServiceSid = process.env.GASSERVICES_VERIFY_SERVICE_ID;
            break;
        case "ANWYLHEATINGSERVICES":
            accountSid = process.env.ANWYLHEATINGSERVICES_ACCOUNT_SID;
            authToken = process.env.ANWYLHEATINGSERVICES_AUTH_TOKEN;
            verifyServiceSid = process.env.ANWYLHEATINGSERVICES_VERIFY_SERVICE_ID;
            break;
        case "HOMEXE":
            accountSid = process.env.HOMEXE_ACCOUNT_SID;
            authToken = process.env.HOMEXE_AUTH_TOKEN;
            verifyServiceSid = process.env.HOMEXE_VERIFY_SERVICE_ID;
            break; 
        
        case "ADAHOMESOLUTIONS":
            accountSid = process.env.ADAHOMESOLUTIONS_ACCOUNT_SID;
            authToken = process.env.ADAHOMESOLUTIONS_AUTH_TOKEN;
            verifyServiceSid = process.env.ADAHOMESOLUTIONS_VERIFY_SERVICE_ID;
            break;
        case "APH":
            accountSid = process.env.APH_ACCOUNT_SID;
            authToken = process.env.APH_AUTH_TOKEN;
            verifyServiceSid = process.env.APH_VERIFY_SERVICE_ID;
            break;
        case "SRW":
            accountSid = process.env.SRW_ACCOUNT_SID;
            authToken = process.env.SRW_AUTH_TOKEN;
            verifyServiceSid = process.env.SRW_VERIFY_SERVICE_ID;
            break;
            
        case "JBPLUMBING":
            accountSid = process.env.JBPLUMBING_ACCOUNT_SID;
            authToken = process.env.JBPLUMBING_AUTH_TOKEN;
            verifyServiceSid = process.env.JBPLUMBING_VERIFY_SERVICE_ID;
            break;
        case "PEGASUS":
            accountSid = process.env.PEGASUS_ACCOUNT_SID;
            authToken = process.env.PEGASUS_AUTH_TOKEN;
            verifyServiceSid = process.env.PEGASUS_VERIFY_SERVICE_ID;
            break;
        case "METEGAS":
            accountSid = process.env.METEGAS_ACCOUNT_SID;
            authToken = process.env.METEGAS_AUTH_TOKEN;
            verifyServiceSid = process.env.METEGAS_VERIFY_SERVICE_ID;
            break;
        case "EVOLUTIONENTRANCESYSTEM":
            accountSid = process.env.EVOLUTIONENTRANCESYSTEM_ACCOUNT_SID;
            authToken = process.env.EVOLUTIONENTRANCESYSTEM_AUTH_TOKEN;
            verifyServiceSid = process.env.EVOLUTIONENTRANCESYSTEM_VERIFY_SERVICE_ID;
            break;
        case "SWINTON":
            accountSid = process.env.SWINTON_ACCOUNT_SID;
            authToken = process.env.SWINTON_AUTH_TOKEN;
            verifyServiceSid = process.env.SWINTON_VERIFY_SERVICE_ID;
            break;
        case "MULTICO":
            accountSid = process.env.MULTICO_ACCOUNT_SID;
            authToken = process.env.MULTICO_AUTH_TOKEN;
            verifyServiceSid = process.env.MULTICO_VERIFY_SERVICE_ID;
            break;
        case "AVCOMM":
            accountSid = process.env.AVCOMM_ACCOUNT_SID;
            authToken = process.env.AVCOMM_AUTH_TOKEN;
            verifyServiceSid = process.env.AVCOMM_VERIFY_SERVICE_ID;
            break;
        case "BEATRIXHOME":
            accountSid = process.env.BEATRIXHOME_ACCOUNT_SID;
            authToken = process.env.BEATRIXHOME_AUTH_TOKEN;
            verifyServiceSid = process.env.BEATRIXHOME_VERIFY_SERVICE_ID;
            break;
        case "PLUMBRITE":
            accountSid = process.env.PLUMBRITE_ACCOUNT_SID;
            authToken = process.env.PLUMBRITE_AUTH_TOKEN;
            verifyServiceSid = process.env.PLUMBRITE_VERIFY_SERVICE_ID;
            break
        case "ECOFUELED":
            accountSid = process.env.ECOFUELED_ACCOUNT_SID;
            authToken = process.env.ECOFUELED_AUTH_TOKEN;
            verifyServiceSid = process.env.ECOFUELED_VERIFY_SERVICE_ID;
            break;
        case "ARKBoiler":
            accountSid = process.env.ARKBoiler_ACCOUNT_SID;
            authToken = process.env.ARKBoiler_AUTH_TOKEN;
            verifyServiceSid = process.env.ARKBoiler_VERIFY_SERVICE_ID;
            break;  
        case "HASE":
            accountSid = process.env.HASE_ACCOUNT_SID;
            authToken = process.env.HASE_AUTH_TOKEN;
            verifyServiceSid = process.env.HASE_VERIFY_SERVICE_ID;
            break;
        case "GASTEKHOME":
            accountSid = process.env.GASTEKHOME_ACCOUNT_SID;
            authToken = process.env.GASTEKHOME_AUTH_TOKEN;
            verifyServiceSid = process.env.GASTEKHOME_VERIFY_SERVICE_ID;
            break;  
        case "STRONGEHOMES":
            accountSid = process.env.STRONGEHOMES_ACCOUNT_SID;
            authToken = process.env.STRONGEHOMES_AUTH_TOKEN;
            verifyServiceSid = process.env.STRONGEHOMES_VERIFY_SERVICE_ID;
            break;    
          case "SOPHIEGILL":
            accountSid = process.env.SOPHIEGILL_ACCOUNT_SID;
            authToken = process.env.SOPHIEGILL_AUTH_TOKEN;
            verifyServiceSid = process.env.SOPHIEGILL_VERIFY_SERVICE_ID;
            break; 
        case "HEATSERV":
            accountSid = process.env.HEATSERV_ACCOUNT_SID;
            authToken = process.env.HEATSERV_AUTH_TOKEN;
            verifyServiceSid = process.env.HEATSERV_VERIFY_SERVICE_ID;
            break; 
        case "PLUMBINGHOT":
            accountSid = process.env.PLUMBINGHOT_ACCOUNT_SID;
            authToken = process.env.PLUMBINGHOT_AUTH_TOKEN;
            verifyServiceSid = process.env.PLUMBINGHOT_VERIFY_SERVICE_ID;
            break;
        case "MIDLAND":
            accountSid = process.env.MIDLAND_ACCOUNT_SID;
            authToken = process.env.MIDLAND_AUTH_TOKEN;
            verifyServiceSid = process.env.MIDLAND_VERIFY_SERVICE_ID;
            break; 
        case "ESSEX":
            accountSid = process.env.ESSEX_ACCOUNT_SID;
            authToken = process.env.ESSEX_AUTH_TOKEN;
            verifyServiceSid = process.env.ESSEX_VERIFY_SERVICE_ID;
            break;
        case "PRIORITY":
            accountSid = process.env.PRIORITY_ACCOUNT_SID;
            authToken = process.env.PRIORITY_AUTH_TOKEN;
            verifyServiceSid = process.env.PRIORITY_VERIFY_SERVICE_ID;
            break;   
        case "RBELECTRICAL":
            accountSid = process.env.RBELECTRICAL_ACCOUNT_SID;
            authToken = process.env.RBELECTRICAL_AUTH_TOKEN;
            verifyServiceSid = process.env.RBELECTRICAL_VERIFY_SERVICE_ID;
            break;
        case "KJGROUP":
            accountSid = process.env.KJGROUP_ACCOUNT_SID;
            authToken = process.env.KJGROUP_AUTH_TOKEN;
            verifyServiceSid = process.env.KJGROUP_VERIFY_SERVICE_ID;
            break;
        case "LOCKANDLINDFIELD":
            accountSid = process.env.LOCKANDLINDFIELD_ACCOUNT_SID;
            authToken = process.env.LOCKANDLINDFIELD_AUTH_TOKEN;
            verifyServiceSid = process.env.LOCKANDLINDFIELD_VERIFY_SERVICE_ID;
            break;
        case "BOILERCOMPANY":
            accountSid = process.env.BOILERCOMPANY_ACCOUNT_SID;
            authToken = process.env.BOILERCOMPANY_AUTH_TOKEN;
            verifyServiceSid = process.env.BOILERCOMPANY_VERIFY_SERVICE_ID;
            break; 
        case "MYGREENENERGY":
            accountSid = process.env.MYGREENENERGY_ACCOUNT_SID;
            authToken = process.env.MYGREENENERGY_AUTH_TOKEN;
            verifyServiceSid = process.env.MYGREENENERGY_VERIFY_SERVICE_ID;
            break;
        case "ADAPTMYHOME":
            accountSid = process.env.ADAPTMYHOME_ACCOUNT_SID;
            authToken = process.env.ADAPTMYHOME_AUTH_TOKEN;
            verifyServiceSid = process.env.ADAPTMYHOME_VERIFY_SERVICE_ID;
            break;
        case "INVERHEAT":
            accountSid = process.env.INVERHEAT_ACCOUNT_SID;
            authToken = process.env.INVERHEAT_AUTH_TOKEN;
            verifyServiceSid = process.env.INVERHEAT_VERIFY_SERVICE_ID;
            break;
        case "CAFGAS":
            accountSid = process.env.CAFGAS_ACCOUNT_SID;
            authToken = process.env.CAFGAS_AUTH_TOKEN;
            verifyServiceSid = process.env.CAFGAS_VERIFY_SERVICE_ID;
            break;
        case "EVPOWERPOINT":
            accountSid = process.env.EVPOWERPOINT_ACCOUNT_SID;
            authToken = process.env.EVPOWERPOINT_AUTH_TOKEN;
            verifyServiceSid = process.env.EVPOWERPOINT_VERIFY_SERVICE_ID;
            break; 
        case "ECOMOTIVE":
            accountSid = process.env.ECOMOTIVE_ACCOUNT_SID;
            authToken = process.env.ECOMOTIVE_AUTH_TOKEN;
            verifyServiceSid = process.env.ECOMOTIVE_VERIFY_SERVICE_ID;
            break; 
        case "HALLSURFACING":
            accountSid = process.env.HALLSURFACING_ACCOUNT_SID;
            authToken = process.env.HALLSURFACING_AUTH_TOKEN;
            verifyServiceSid = process.env.HALLSURFACING_VERIFY_SERVICE_ID;
            break;
        case "THAMESVALLEY":
            accountSid = process.env.THAMESVALLEY_ACCOUNT_SID;
            authToken = process.env.THAMESVALLEY_AUTH_TOKEN;
            verifyServiceSid = process.env.THAMESVALLEY_VERIFY_SERVICE_ID;
            break;
        case "BEEECO":
            accountSid = process.env.BEEECO_ACCOUNT_SID;
            authToken = process.env.BEEECO_AUTH_TOKEN;
            verifyServiceSid = process.env.BEEECO_VERIFY_SERVICE_ID;
            break;
        case "WeBuildTrades":
            accountSid = process.env.WeBuildTrades_ACCOUNT_SID;
            authToken = process.env.WeBuildTrades_AUTH_TOKEN;
            verifyServiceSid = process.env.WeBuildTrades_VERIFY_SERVICE_ID;
            break;
        case "fortiselectrical":
            accountSid = process.env.fortiselectrical_ACCOUNT_SID;
            authToken = process.env.fortiselectrical_AUTH_TOKEN;
            verifyServiceSid = process.env.fortiselectrical_VERIFY_SERVICE_ID;
            break;
        case "debonair":
            accountSid = process.env.debonair_ACCOUNT_SID;
            authToken = process.env.debonair_AUTH_TOKEN;
            verifyServiceSid = process.env.debonair_VERIFY_SERVICE_ID;
            break;
        case "APEXEnergy":
            accountSid = process.env.APEXEnergy_ACCOUNT_SID;
            authToken = process.env.APEXEnergy_AUTH_TOKEN;
            verifyServiceSid = process.env.APEXEnergy_VERIFY_SERVICE_ID;
            break;
         case "TMS":
            accountSid = process.env.TMS_ACCOUNT_SID;
            authToken = process.env.TMS_AUTH_TOKEN;
            verifyServiceSid = process.env.TMS_VERIFY_SERVICE_ID;
            break;
        case "ddjheating":
            accountSid = process.env.ddjheating_ACCOUNT_SID;
            authToken = process.env.ddjheating_AUTH_TOKEN;
            verifyServiceSid = process.env.ddjheating_VERIFY_SERVICE_ID;
            break;
        case "Amersham":
            accountSid = process.env.Amersham_ACCOUNT_SID;
            authToken = process.env.Amersham_AUTH_TOKEN;
            verifyServiceSid = process.env.Amersham_VERIFY_SERVICE_ID;
            break;
        case "centrona":
            accountSid = process.env.centrona_ACCOUNT_SID;
            authToken = process.env.centrona_AUTH_TOKEN;
            verifyServiceSid = process.env.centrona_VERIFY_SERVICE_ID;
            break;
        case "Suntec":
            accountSid = process.env.Suntec_ACCOUNT_SID;
            authToken = process.env.Suntec_AUTH_TOKEN;
            verifyServiceSid = process.env.Suntec_VERIFY_SERVICE_ID;
            break;
        case "Kennet":
            accountSid = process.env.Kennet_ACCOUNT_SID;
            authToken = process.env.Kennet_AUTH_TOKEN;
            verifyServiceSid = process.env.Kennet_VERIFY_SERVICE_ID;
            break;
        case "coreplumbing":
            accountSid = process.env.coreplumbing_ACCOUNT_SID;
            authToken = process.env.coreplumbing_AUTH_TOKEN;
            verifyServiceSid = process.env.coreplumbing_VERIFY_SERVICE_ID;
            break;
        case "stewart":
            accountSid = process.env.stewart_ACCOUNT_SID;
            authToken = process.env.stewart_AUTH_TOKEN;
            verifyServiceSid = process.env.stewart_VERIFY_SERVICE_ID;
            break;
        case "Jawgas":
            accountSid = process.env.Jawgas_ACCOUNT_SID;
            authToken = process.env.Jawgas_AUTH_TOKEN;
            verifyServiceSid = process.env.Jawgas_VERIFY_SERVICE_ID;
            break;
        case "ZNS":
            accountSid = process.env.ZNS_ACCOUNT_SID;
            authToken = process.env.ZNS_AUTH_TOKEN;
            verifyServiceSid = process.env.ZNS_VERIFY_SERVICE_ID;
            break;
        case "VALLEYGAS":
            accountSid = process.env.VALLEYGAS_ACCOUNT_SID;
            authToken = process.env.VALLEYGAS_AUTH_TOKEN;
            verifyServiceSid = process.env.VALLEYGAS_VERIFY_SERVICE_ID;
            break;
        case "SUPERIOR":
            accountSid = process.env.SUPERIOR_ACCOUNT_SID;
            authToken = process.env.SUPERIOR_AUTH_TOKEN;
            verifyServiceSid = process.env.SUPERIOR_VERIFY_SERVICE_ID;
            break; 
        case "IanReid":
            accountSid = process.env.IanReid_ACCOUNT_SID;
            authToken = process.env.IanReid_AUTH_TOKEN;
            verifyServiceSid = process.env.IanReid_VERIFY_SERVICE_ID;
            break; 
        case "ACTIMART":
            accountSid = process.env.ACTIMART_ACCOUNT_SID;
            authToken = process.env.ACTIMART_AUTH_TOKEN;
            verifyServiceSid = process.env.ACTIMART_VERIFY_SERVICE_ID;
            break;
        case "discoversolar":
            accountSid = process.env.discoversolar_ACCOUNT_SID;
            authToken = process.env.discoversolar_AUTH_TOKEN;
            verifyServiceSid = process.env.discoversolar_VERIFY_SERVICE_ID;
            break;
        case "maxsolar":
            accountSid = process.env.maxsolar_ACCOUNT_SID;
            authToken = process.env.maxsolar_AUTH_TOKEN;
            verifyServiceSid = process.env.maxsolar_VERIFY_SERVICE_ID;
            break;
        case "energysaving":
            accountSid = process.env.energysaving_ACCOUNT_SID;
            authToken = process.env.energysaving_AUTH_TOKEN;
            verifyServiceSid = process.env.energysaving_VERIFY_SERVICE_ID;
            break;
        case "WYSE":
            accountSid = process.env.WYSE_ACCOUNT_SID;
            authToken = process.env.WYSE_AUTH_TOKEN;
            verifyServiceSid = process.env.WYSE_VERIFY_SERVICE_ID;
            break;
        case "Cheltenham":
            accountSid = process.env.Cheltenham_ACCOUNT_SID;
            authToken = process.env.Cheltenham_AUTH_TOKEN;
            verifyServiceSid = process.env.Cheltenham_VERIFY_SERVICE_ID;
            break; 
        case "HUMBER":
            accountSid = process.env.HUMBER_ACCOUNT_SID;
            authToken = process.env.HUMBER_AUTH_TOKEN;
            verifyServiceSid = process.env.HUMBER_VERIFY_SERVICE_ID;
            break;
        case "prestige":
            accountSid = process.env.prestige_ACCOUNT_SID;
            authToken = process.env.prestige_AUTH_TOKEN;
            verifyServiceSid = process.env.prestige_VERIFY_SERVICE_ID;
            break;
         case "ARK":
            accountSid = process.env.ARK_ACCOUNT_SID;
            authToken = process.env.ARK_AUTH_TOKEN;
            verifyServiceSid = process.env.ARK_VERIFY_SERVICE_ID;
            break;
         case "Greenenergy":
            accountSid = process.env.Greenenergy_ACCOUNT_SID;
            authToken = process.env.Greenenergy_AUTH_TOKEN;
            verifyServiceSid = process.env.Greenenergy_VERIFY_SERVICE_ID;
            break;
        case "Alpha":
            accountSid = process.env.Alpha_ACCOUNT_SID;
            authToken = process.env.Alpha_AUTH_TOKEN;
            verifyServiceSid = process.env.Alpha_VERIFY_SERVICE_ID;
            break;
        case "PLUMBGUYS":
            accountSid = process.env.PLUMBGUYS_ACCOUNT_SID;
            authToken = process.env.PLUMBGUYS_AUTH_TOKEN;
            verifyServiceSid = process.env.PLUMBGUYS_VERIFY_SERVICE_ID;
            break;
        case "SJC":
            accountSid = process.env.SJC_ACCOUNT_SID;
            authToken = process.env.SJC_AUTH_TOKEN;
            verifyServiceSid = process.env.SJC_VERIFY_SERVICE_ID;
            break;
        case "ALBO":
            accountSid = process.env.ALBO_ACCOUNT_SID;
            authToken = process.env.ALBO_AUTH_TOKEN;
            verifyServiceSid = process.env.ALBO_VERIFY_SERVICE_ID;
            break;
        case "ALPHA":
            accountSid = process.env.ALPHA_ACCOUNT_SID;
            authToken = process.env.ALPHA_AUTH_TOKEN;
            verifyServiceSid = process.env.ALPHA_VERIFY_SERVICE_ID;
            break;
        case "MCB":
            accountSid = process.env.MCB_ACCOUNT_SID;
            authToken = process.env.MCB_AUTH_TOKEN;
            verifyServiceSid = process.env.MCB_VERIFY_SERVICE_ID;
            break;
        case "plumbingandrenewables":
            accountSid = process.env.plumbingandrenewables_ACCOUNT_SID;
            authToken = process.env.plumbingandrenewables_AUTH_TOKEN;
            verifyServiceSid = process.env.plumbingandrenewables_VERIFY_SERVICE_ID;
            break;
        case "burgess":
            accountSid = process.env.burgess_ACCOUNT_SID;
            authToken = process.env.burgess_AUTH_TOKEN;
            verifyServiceSid = process.env.burgess_VERIFY_SERVICE_ID;
            break;
        case "cbplumbing":
            accountSid = process.env.cbplumbing_ACCOUNT_SID;
            authToken = process.env.cbplumbing_AUTH_TOKEN;
            verifyServiceSid = process.env.cbplumbing_VERIFY_SERVICE_ID;
            break;
        case "dec":
            accountSid = process.env.dec_ACCOUNT_SID;
            authToken = process.env.dec_AUTH_TOKEN;
            verifyServiceSid = process.env.dec_VERIFY_SERVICE_ID;
            break;
        case "quantum":
            accountSid = process.env.quantum_ACCOUNT_SID;
            authToken = process.env.quantum_AUTH_TOKEN;
            verifyServiceSid = process.env.quantum_VERIFY_SERVICE_ID;
            break;
        case "Current":
            accountSid = process.env.Current_ACCOUNT_SID;
            authToken = process.env.Current_AUTH_TOKEN;
            verifyServiceSid = process.env.Current_VERIFY_SERVICE_ID;
            break;
        case "tyneandwear":
            accountSid = process.env.tyneandwear_ACCOUNT_SID;
            authToken = process.env.tyneandwear_AUTH_TOKEN;
            verifyServiceSid = process.env.tyneandwear_VERIFY_SERVICE_ID;
            break;
        case "southcoast":
            accountSid = process.env.southcoast_ACCOUNT_SID;
            authToken = process.env.southcoast_AUTH_TOKEN;
            verifyServiceSid = process.env.southcoast_VERIFY_SERVICE_ID;
            break;
        case "heatworks":
            accountSid = process.env.heatworks_ACCOUNT_SID;
            authToken = process.env.heatworks_AUTH_TOKEN;
            verifyServiceSid = process.env.heatworks_VERIFY_SERVICE_ID;
            break;
        case "heatseal":
            accountSid = process.env.heatseal_ACCOUNT_SID;
            authToken = process.env.heatseal_AUTH_TOKEN;
            verifyServiceSid = process.env.heatseal_VERIFY_SERVICE_ID;
            break;
        case "upgradehome":
            accountSid = process.env.upgradehome_ACCOUNT_SID;
            authToken = process.env.upgradehome_AUTH_TOKEN;
            verifyServiceSid = process.env.upgradehome_VERIFY_SERVICE_ID;
            break;
        case "realheating":
            accountSid = process.env.realheating_ACCOUNT_SID;
            authToken = process.env.realheating_AUTH_TOKEN;
            verifyServiceSid = process.env.realheating_VERIFY_SERVICE_ID;
            break;
        case "cdmech":
            accountSid = process.env.cdmech_ACCOUNT_SID;
            authToken = process.env.cdmech_AUTH_TOKEN;
            verifyServiceSid = process.env.cdmech_VERIFY_SERVICE_ID;
            break;
        case "keenan":
            accountSid = process.env.keenan_ACCOUNT_SID;
            authToken = process.env.keenan_AUTH_TOKEN;
            verifyServiceSid = process.env.keenan_VERIFY_SERVICE_ID;
            break;
        case "FRESHAIRSOLUTIONS":
            accountSid = process.env.FRESHAIRSOLUTIONS_ACCOUNT_SID;
            authToken = process.env.FRESHAIRSOLUTIONS_AUTH_TOKEN;
            verifyServiceSid = process.env.FRESHAIRSOLUTIONS_VERIFY_SERVICE_ID;
            break;
        case "Verdi":
            accountSid = process.env.Verdi_ACCOUNT_SID;
            authToken = process.env.Verdi_AUTH_TOKEN;
            verifyServiceSid = process.env.Verdi_VERIFY_SERVICE_ID;
            break;
        case "countyboilers":
            accountSid = process.env.countyboilers_ACCOUNT_SID;
            authToken = process.env.countyboilers_AUTH_TOKEN;
            verifyServiceSid = process.env.countyboilers_VERIFY_SERVICE_ID;
            break;
        case "acornpavin":
            accountSid = process.env.acornpavin_ACCOUNT_SID;
            authToken = process.env.acornpavin_AUTH_TOKEN;
            verifyServiceSid = process.env.acornpavin_VERIFY_SERVICE_ID;
            break;
        case "Heatr":
            accountSid = process.env.Heatr_ACCOUNT_SID;
            authToken = process.env.Heatr_AUTH_TOKEN;
            verifyServiceSid = process.env.Heatr_VERIFY_SERVICE_ID;
            break;
        case "northbound":
            accountSid = process.env.northbound_ACCOUNT_SID;
            authToken = process.env.northbound_AUTH_TOKEN;
            verifyServiceSid = process.env.northbound_VERIFY_SERVICE_ID;
            break;
        case "Worcestershire":
            accountSid = process.env.Worcestershire_ACCOUNT_SID;
            authToken = process.env.Worcestershire_AUTH_TOKEN;
            verifyServiceSid = process.env.Worcestershire_VERIFY_SERVICE_ID;
            break;
        case "shardwindows":
            accountSid = process.env.shardwindows_ACCOUNT_SID;
            authToken = process.env.shardwindows_AUTH_TOKEN;
            verifyServiceSid = process.env.shardwindows_VERIFY_SERVICE_ID;
            break;
        case "cambridgesolar":
            accountSid = process.env.cambridgesolar_ACCOUNT_SID;
            authToken = process.env.cambridgesolar_AUTH_TOKEN;
            verifyServiceSid = process.env.cambridgesolar_VERIFY_SERVICE_ID;
            break;
        case "csj":
            accountSid = process.env.csj_ACCOUNT_SID;
            authToken = process.env.csj_AUTH_TOKEN;
            verifyServiceSid = process.env.csj_VERIFY_SERVICE_ID;
            break;
        case "WBT":
            accountSid = process.env.WBT_ACCOUNT_SID;
            authToken = process.env.WBT_AUTH_TOKEN;
            verifyServiceSid = process.env.WBT_VERIFY_SERVICE_ID;
            break;
        case "proactive":
            accountSid = process.env.proactive_ACCOUNT_SID;
            authToken = process.env.proactive_AUTH_TOKEN;
            verifyServiceSid = process.env.proactive_VERIFY_SERVICE_ID;
            break;
        case "Evergreen":
            accountSid = process.env.Evergreen_ACCOUNT_SID;
            authToken = process.env.Evergreen_AUTH_TOKEN;
            verifyServiceSid = process.env.Evergreen_VERIFY_SERVICE_ID;
            break;
        case "jkcooling":
            accountSid = process.env.jkcooling_ACCOUNT_SID;
            authToken = process.env.jkcooling_AUTH_TOKEN;
            verifyServiceSid = process.env.jkcooling_VERIFY_SERVICE_ID;
            break;
        case "effectenergy":
            accountSid = process.env.effectenergy_ACCOUNT_SID;
            authToken = process.env.effectenergy_AUTH_TOKEN;
            verifyServiceSid = process.env.effectenergy_VERIFY_SERVICE_ID;
            break;
        case "Ashford":
            accountSid = process.env.Ashford_ACCOUNT_SID;
            authToken = process.env.Ashford_AUTH_TOKEN;
            verifyServiceSid = process.env.Ashford_VERIFY_SERVICE_ID;
            break;
        case "japlumbing":
            accountSid = process.env.japlumbing_ACCOUNT_SID;
            authToken = process.env.japlumbing_AUTH_TOKEN;
            verifyServiceSid = process.env.japlumbing_VERIFY_SERVICE_ID;
            break;
        case "Nuera":
            accountSid = process.env.Nuera_ACCOUNT_SID;
            authToken = process.env.Nuera_AUTH_TOKEN;
            verifyServiceSid = process.env.Nuera_VERIFY_SERVICE_ID;
            break;
        case "HHE":
            accountSid = process.env.HHE_ACCOUNT_SID;
            authToken = process.env.HHE_AUTH_TOKEN;
            verifyServiceSid = process.env.HHE_VERIFY_SERVICE_ID;
            break;
        case "cooper":
            accountSid = process.env.cooper_ACCOUNT_SID;
            authToken = process.env.cooper_AUTH_TOKEN;
            verifyServiceSid = process.env.cooper_VERIFY_SERVICE_ID;
            break;
        case "NuGen":
            accountSid = process.env.NuGen_ACCOUNT_SID;
            authToken = process.env.NuGen_AUTH_TOKEN;
            verifyServiceSid = process.env.NuGen_VERIFY_SERVICE_ID;
            break;
        case "Roofing":
            accountSid = process.env.Roofing_ACCOUNT_SID;
            authToken = process.env.Roofing_AUTH_TOKEN;
            verifyServiceSid = process.env.Roofing_VERIFY_SERVICE_ID;
            break;
        case "GoKonnect":
            accountSid = process.env.GoKonnect_ACCOUNT_SID;
            authToken = process.env.GoKonnect_AUTH_TOKEN;
            verifyServiceSid = process.env.GoKonnect_VERIFY_SERVICE_ID;
            break;
         case "optimalcooling":
            accountSid = process.env.optimalcooling_ACCOUNT_SID;
            authToken = process.env.optimalcooling_AUTH_TOKEN;
            verifyServiceSid = process.env.optimalcooling_VERIFY_SERVICE_ID;
            break;
        case "holgateelectrical":
            accountSid = process.env.holgateelectrical_ACCOUNT_SID;
            authToken = process.env.holgateelectrical_AUTH_TOKEN;
            verifyServiceSid = process.env.holgateelectrical_VERIFY_SERVICE_ID;
            break;
        case "Berkshire":
            accountSid = process.env.Berkshire_ACCOUNT_SID;
            authToken = process.env.Berkshire_AUTH_TOKEN;
            verifyServiceSid = process.env.Berkshire_VERIFY_SERVICE_ID;
            break;
        case "Keystone":
            accountSid = process.env.Keystone_ACCOUNT_SID;
            authToken = process.env.Keystone_AUTH_TOKEN;
            verifyServiceSid = process.env.Keystone_VERIFY_SERVICE_ID;
            break;
        case "oakwood":
            accountSid = process.env.oakwood_ACCOUNT_SID;
            authToken = process.env.oakwood_AUTH_TOKEN;
            verifyServiceSid = process.env.oakwood_VERIFY_SERVICE_ID;
            break;
        default:
            accountSid = "";
    }

    if (accountSid === "" || authToken === "") {
        res.json({ success: false, error: "client name not found", phoneNumber: phone, clientname: clientName });
        return;
    }

    const client = twilio(accountSid, authToken);

    client.verify.v2.services(verifyServiceSid)
        .verificationChecks
        .create({ to: phone, code: otp })
        .then(verification_check => {
            if (verification_check.status === 'approved') {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        })
        .catch(error => {
            console.error('Error verifying OTP:', error);
            res.json({ success: false, error });
        });
});

app.get('/phone-verification/test', (req, res) => {
    res.json({ success: 'test call' });
});

app.get('/phone-verification', (req, res) => {
    res.json({ success: "server is running." });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
