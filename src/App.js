import * as React from "react";
import { useRef } from "react";
// import "rsuite/dist/rsuite-no-reset.min.css";
import "./style.scss";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Payment from "./pages/payment";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import { ToastContainer } from "react-toastify";
import Notifications from "./components/notifications";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { NotificationContext } from "./context/NotificationContext";
import useClickOutside from "./customHooks/useClickOutside";
import { ProfileContext } from "./context/ProfileContext";
import AddProfilePic from "./components/profilePic/addProfilePic";
import User from "./pages/user";
import Counsellor from "./pages/counsellor";
import CounsellorProfile from "./pages/counsellorProfile";
import PaymentDetails from "./pages/paymentDetails";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from "./components/breadcrumb";
import AddWebinar from "./components/addWebinar";
import { WebinarContext } from "./context/WebinarContext";
import Help from "./pages/help";
import JoinWebinar from "./pages/joinWebinar";
import Banners from "./pages/banners";
import AddBanner from "./pages/banners/addBanner";
import { BannerContext } from "./context/BannerContext";
import UserDetails from "./pages/userDetails";
import Webinar from "./pages/webinar";
import WebinarProfile from "./pages/webinarProfile";
import EntrancePreparation from "./pages/entrancePreparation";
import FeatureAndPreference from "./pages/featureAndPreference";
import InstituteDirectory from "./pages/instituteDirectory";
import InstitutesDetails from "./pages/instituteDirectory";
import InstituteProfile from "./pages/instituteProfile";
import AllLeads from "./pages/AllLeads";
import Accommodation from "./pages/accommodation";
import AddAccommodationPopup from "./components/addAccommodationPopup";
import { AccommodationContext } from "./context/AccommodationContext";
import AccommodationDetails from "./pages/accommodationDetails";
import AddAccommodation from "./pages/addAccommodation";
import ViewLeads from "./pages/viewLeads";
import ViewAccoummDetails from "./components/accommodationViewDetails";
import AddAnnouncementPopup from "./components/addAnnouncementPopup";
import { CounsellorContext } from "./context/CounsellorContext";
import AddEpProfilePic from "./components/epProfilePicEdit";
import AddCounsellorProfilePic from "./components/counsellorEditProfilePic";
import InstituteLeads from "./pages/instituteLeads";
import EditAccommodation from "./pages/editAccommodation";
import AddEpCoverPhoto from "./components/epCoverPhoto/addEpCoverPhoto";


// import FaqAndTroubleshooting from "./pages/faqAndTroubleshooting";
// import QuestionForum from "./pages/questionForum";
function App() {
  const addProfilePicRef = useRef(null);
  const addEpProfilePicRef = useRef(null);
  const addEpCoverPhotoRef = useRef(null);
  const addCounsellorPicRef = useRef(null);
  const { admin, setAdmin } = useContext(AdminContext);
  const { isLoggedIn } = admin;
  const { addMode, webinar, setWebinar, setAddMode } =
    useContext(WebinarContext);
  const { notificationsEnable, setNotificationsEnable, notificationsRef } =
    useContext(NotificationContext);
  const { profilePicEditMode, setProfilePicEditMode , epProfilePicEditMode, 
   setEpProfilePicEditMode,counsellorProfilePicEditMode,
   setCounsellorProfilePicEditMode,
   setEpCoverPhotoEditMode, epCoverPhotoEditMode} =
    useContext(ProfileContext);
  const { addBannerMode } = useContext(BannerContext);

  const navigate = useNavigate();
  const { addAccommodationEnable, setAddAccommodationEnable } =
    useContext(AccommodationContext);
  const { outstandingBalancePopUp, setOutstandingBalancePopUp } =
    useContext(CounsellorContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAdmin({ ...admin, isLoggedIn: false });
    navigate("/login");
  };
  
  useClickOutside(addEpProfilePicRef, () => {
    setEpProfilePicEditMode(false);
  })

  useClickOutside(addEpCoverPhotoRef, () => {
    setEpCoverPhotoEditMode(false);
  })

  useClickOutside(addProfilePicRef, () => {
    setProfilePicEditMode(false);
  });

  useClickOutside(notificationsRef, () => {
    setNotificationsEnable(false);
  });
  return (
    <div>
      {addMode && (
        <div className="add-session-container">
          <AddWebinar setAddMode={setAddMode} />
        </div>
      )}
      {addAccommodationEnable && <AddAccommodationPopup />}
      {isLoggedIn && <Header handleLogout={handleLogout} />}
      {profilePicEditMode && (
        <div className="add-profile-pic-panel">
          <AddProfilePic ref={addProfilePicRef} />
        </div>
      )}
      {/* HER HERE HERE HEER HERE HEREE  */}
      {/* HER HERE HERE HEER HERE HEREE  */}
      {/* HER HERE HERE HEER HERE HEREE  */}
      {/* HER HERE HERE HEER HERE HEREE  */}
      {epProfilePicEditMode && (
        <div className="add-ep-profile-pic-panel">
          <AddEpProfilePic ref={addEpProfilePicRef} />
        </div>
      )}
      {epCoverPhotoEditMode && (
        <div className="add-ep-profile-pic-panel">
          <AddEpCoverPhoto ref={addEpCoverPhotoRef} />
        </div>
      )}
      {counsellorProfilePicEditMode && (
        <div className="add-counsellor-profile-pic-panel">
          <AddCounsellorProfilePic ref={addCounsellorPicRef} />
        </div>
      )}
      {addBannerMode && (
        <div classname="add-profile-pic-panel">
          <AddBanner />
        </div>
      )}

      <div className="main">
        <ToastContainer />

        {notificationsEnable && <Notifications />}

        {isLoggedIn && <Sidebar />}
        <div className={`${isLoggedIn && "main-content"}`}>
          {isLoggedIn && (
            <div className="breadcrumb-main">
              <Breadcrumb />
            </div>
          )}

          {outstandingBalancePopUp && (
            <div>
              <AddAnnouncementPopup />
            </div>
          )}
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/login" element={<Navigate replace to="/" />} />
                <Route path="/payment" element={<Payment />} />
                <Route
                  path="/payment/payment-details/:payment_id"
                  element={<PaymentDetails />}
                />
                <Route path="/user" element={<User />} />
                <Route
                  path="/user/user-details/:user_id"
                  element={<UserDetails />}
                />
                <Route path="/counsellors" element={<Counsellor />} />
                <Route path="/banners" element={<Banners />} />
                <Route
                  path="/counsellors/counsellor-profile/:counsellor_id"
                  element={<CounsellorProfile />}
                />
                <Route
                  path="/webinar/:webinar_id"
                  element={<WebinarProfile />}
                />
                <Route
                  path="/webinar"
                  element={<Webinar webinar={webinar} />}
                />
                {/* <Route path="/webinar" element={<Webinar />} /> */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/help" element={<Help />} />
                <Route
                  path="/entrance-preparation"
                  element={<EntrancePreparation />}
                />
                <Route
                  path="/view_leads_for_admin/:institute_id"
                  element={<AllLeads />}
                />
                <Route
                  path="/getAllQueries/:enquiry_id"
                  element={<ViewLeads />}
                />
                <Route
                  path="/entrance-preparation/feature-and-preference"
                  element={<FeatureAndPreference />}
                />
                <Route
                  path="/entrance-preparation/institute-directory"
                  element={<InstitutesDetails />}
                />
                <Route
                  path="/entrance-preparation/institute-directory/:institute_id"
                  element={<InstituteProfile />}
                />
                <Route
                  path="/entrance-preparation/institute-directory/institute-leads"
                  element={<InstituteLeads />}
                />

                <Route path="/accommodation" element={<Accommodation />} />
                <Route
                  path="accommodation/add"
                  element={<AddAccommodation />}
                />
                <Route
                  path="/accommodation/details/:accomodation_id"
                  element={<AccommodationDetails />}
                />
                <Route
                  path="/accommodation/edit/:accomodation_id"
                  element={<EditAccommodation />}
                />
                <Route
                  path="/accommodationDetails"
                  element={<ViewAccoummDetails />}
                />

                {/* <Route path ="/help/faq-and-troubleshooting" element = {<FaqAndTroubleshooting />}/> */}
                {/* <Route path="/question-forum" element={<QuestionForum />} /> */}
              </>
            ) : (
              <>
                <Route path="*" element={<Navigate replace to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Login />} />
                <Route path="/password-reset" element={<Login />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
