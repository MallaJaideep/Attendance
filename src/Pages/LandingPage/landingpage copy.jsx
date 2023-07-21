import React, { useState } from "react";
import images from "../../images/images";
import "./_landingpage.scss";
import "./_popup.scss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
// import moment from "moment";
import StartFirebase from "../../firebase/index";
import {
  ref,
  set,
  get,
  update,
  remove,
  child,
  onValue,
} from "firebase/database";
import {
  Card,
  // Select,
  Table,
  Stack,
  Paper,
  Avatar,
  TextField,
  Popover,
  Checkbox,
  TableRow,
  Menu,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Box,
} from "@mui/material";
export default function LandingPage() {
  // for firebase configuration
  const db = StartFirebase();
  let myDate = new Date();
  let hrs = myDate.getHours();
  const moment = require("moment");

  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs <= 16) greet = "Good Afternoon";
  else if (hrs >= 16 && hrs <= 24) greet = "Good Evening";
  const [state, setState] = useState({ tableData: [] });
  const [state2, setState2] = useState([]);
  const [DisplayName1, setDisplayName1] = useState(greet);
  const [DisplayName2, setDisplayName2] = useState(
    "Select Employee ID to View"
  );
  const [DisplayName3, setDisplayName3] = useState("");

  const [EmployeID, setEmployeID] = useState("");
  const [Name, setName] = useState("");
  const [Designation, setDesignation] = useState("");
  const [EmployeeID, setEmployeeID] = useState("Select in The List");
  const [AttendanceEmployee, setAttendanceEmployee] = useState([]);
  const [AttendanceEmployeeState, setAttendanceEmployeeState] = useState(false);
  let displaySelected;

  // const [TodayDate, setTodayDate] = useState(true);
  const [run, setRun] = useState(true);
  const [run2, setRun2] = useState(true);
  function dataFetch() {
    const dbRef = ref(db, "Device1");
    onValue(dbRef, (snapshot) => {
      let records = [];
      // console.log(snapshot);
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        // console.log(keyName, data);
        records.push({ key: keyName, data: data });
      });
      if (run) {
        setState({ tableData: records });
        setRun(false);
      }
    });
  }
  dataFetch();
  function dataFetch2() {
    const dbRef = ref(db, "UsersData");
    onValue(dbRef, (snapshot) => {
      let records = [];
      // console.log(snapshot);
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        // console.log(keyName, data);
        records.push({ key: keyName, data: data });
      });
      if (run2) {
        setState2(records);
        console.log(records);
        setRun2(false);
      }
    });
  }
  dataFetch2();
  function diffYMDHMS(date1, date2) {
    let hours = date1.diff(date2, "hours");
    date2.add(hours, "hours");

    let minutes = date1.diff(date2, "minutes");
    date2.add(minutes, "minutes");

    let seconds = date1.diff(date2, "seconds");

    // console.log(hours + "   hrs " + minutes + " min " + seconds + " seconds");

    // return { hours, minutes, seconds };
    // console.log(hours + "   hrs " + minutes + " min " + seconds + " seconds");

    return hours + "Hrs " + minutes + "Min " + seconds + "Sec";
  }
  // setDisplayName1(greet);
  function DataShow(KeyValue) {
    // let ScreenData = [];
    console.log(state2[KeyValue].data);
    setDisplayName1(state2[KeyValue].data.EmployeeName);
    setDisplayName2(state2[KeyValue].data.EmployeeDesgination);
    let AttendancePath = state2[KeyValue].data.attendance;
    console.log(AttendancePath);
    let CompleteData = [];
    let CompleteDataKeys = Object.keys(AttendancePath);
    CompleteDataKeys.forEach((DaysData) => {
      console.log(DaysData);
      let TimeData = AttendancePath[DaysData];
      let StartTime = AttendancePath[DaysData]["starttime"];
      let EndTime = AttendancePath[DaysData]["endtime"];
      // for start
      let StartTimeShow;
      let TimeStart;
      let TimeStart2;
      if (StartTime != null) {
        StartTimeShow = StartTime[Object.keys(StartTime)[0]];
        TimeStart = moment(StartTimeShow).format("h:mm:ss a");
        TimeStart2 = moment(StartTimeShow);
      } else {
        TimeStart = "-";
      }

      // for end
      let EndTimeLast;
      let EndTimeShow;
      let TimeEnd;
      let TimeEnd2;
      let TimeSpent;
      // console.log(EndTime, "EndTime");
      if (EndTime != null) {
        EndTimeLast = Object.keys(EndTime);
        EndTimeShow = EndTime[EndTimeLast[EndTimeLast.length - 1]];
        TimeEnd = moment(EndTimeShow).format("h:mm:ss a");
        TimeEnd2 = moment(EndTimeShow);
        console.log(TimeStart);
        console.log(TimeEnd);
        TimeSpent = diffYMDHMS(TimeEnd2, TimeStart2);
      } else {
        TimeEnd = "-";
        TimeEnd2 = "-";
        TimeSpent = "-";
      }

      // let TimeSpent = moment(TimeEnd).startOf("").from(TimeStart);
      // let TimeSpent = TimeStart.diff(TimeEnd, "", true);
      // let TimeSpent = TimeStart2.diff(TimeEnd2, "h:mm:ss", true);
      console.log(TimeData);
      console.log(StartTime);
      console.log(EndTime);
      console.log(StartTimeShow);
      console.log(EndTimeShow);
      console.log(TimeSpent);

      CompleteData.push({
        TimeStart,
        TimeEnd,
        TimeSpent,
        DaysData,
      });
    });
    // AttendancePath.forEach((DayData) => {
    //   console.log(DayData);
    // });
    // state2[KeyValue].data.attendance.map((completeData) => {
    //   console.log(completeData);
    // });
    console.log(CompleteData.reverse());
    setAttendanceEmployee(CompleteData);
    setAttendanceEmployeeState(true);
    // Thursday, April 20 2023
    // console.log(new Date());
    // let time = moment("Thursday, April 20 2023 16:06:09").format(
    //   "MMMM Do YYYY, h:mm:ss a"
    // );
    // console.log(time);
  }

  const dbRef = ref(db);
  // get(child(dbRef, "/Device1")).then((snapshot) => {
  //   console.log(snapshot);
  //   // update(ref(db, address), { output: true });
  // });
  // end for firebase configuration

  const [employeeSelect, setemployeeSelect] = useState(true);
  const [clickEvent, setclickEvent] = useState(false);
  let popupdefault = [true, false, false, false];
  const [popupnav, setpopupnav] = useState(popupdefault);

  const PopupNavHandler = (index) => {
    const updatedStatus = popupnav.map((c, i) => {
      if (i <= index) {
        return true;
      } else {
        return false;
      }
    });
    console.log(updatedStatus);
    setpopupnav(updatedStatus);
  };
  let popupdefaultdisplay = [true, false, false, false];
  const [popupnavdisplay, setpopupnavdisplay] = useState(popupdefaultdisplay);

  const PopupNavDisplayHandler = (index) => {
    const updatedStatus = popupnavdisplay.map((c, i) => {
      if (i == index) {
        return true;
      } else {
        return false;
      }
    });
    console.log(updatedStatus);
    setpopupnavdisplay(updatedStatus);
  };
  const [open, setOpen] = useState(false);
  function OpenPopup() {
    setOpen(true);
  }
  let defaultDate = new Date();
  let date = moment(defaultDate).format("dddd, MMMM d YYYY");
  // function displayImage(){

  // }
  // displayImage()
  //   moment().format("MMMM Do YYYY, h:mm:ss a");
  return (
    <div className="lp-cont1">
      <div className="lp-cont2">
        <div className="lp-cont3">
          <img
            src={images.menu}
            alt=""
            style={{ fill: "white" }}
            className="lp-img1"
          />
        </div>
        <div className="lp-cont4">Attendance</div>
        <div
          className="lp-cont5"
          onClick={() => {
            setAttendanceEmployeeState(false);
          }}
        >
          <img
            src={images.homenav}
            alt=""
            style={{ fill: "white" }}
            className="lp-img1"
          />
        </div>
      </div>
      <div className="lp-cont6">
        <div className={employeeSelect ? "lp-cont8" : "hidediv-popup"}>
          <div className="lp-cont7">
            <span className="lp-text1">{DisplayName1}</span>
            <span className="lp-text2">Employee ID: {EmployeeID}</span>
          </div>
          <div className="lp-cont7">
            <span className="lp-text3">{DisplayName2}</span>
            <span className="lp-text4">
              {date}
              {/* {moment(date).format("dddd, MMMM d YYYY")} */}
            </span>
          </div>
        </div>
        {/* <div className={employeeSelect ? "hidediv-popup" : " lp-cont15"}>
          <div className="lp-cont7">
            <span className="lp-text1">Test User1</span>
            <span className="lp-text2">Employee ID: 1</span>
          </div>
          <div className="lp-cont7">
            <span className="lp-text3">Designation</span>
            <span className="lp-text4">
              {moment(date).format("Do MMMM YYYY")}
            </span>
          </div>
        </div> */}
        <div className="lp-cont9">
          {state2.map((data) => {
            let Key = data.key;
            console.log(data, "datadatadata");
            if (EmployeeID === Key) {
              displaySelected = true;
            } else {
              displaySelected = false;
            }
            return (
              <div className="lp-cont10">
                <div
                  className="lp-cont11"
                  id={displaySelected ? "employee-active" : ""}
                  onClick={() => {
                    setEmployeeID(data.key);
                    DataShow(data.key);
                  }}
                >
                  {data.key}
                </div>
                <div className="lp-cont12">
                  <img src={images.wrong} alt="" className="lp-img2" />
                </div>
              </div>
            );
          })}
          {/* <div className="lp-cont10">
            <div className="lp-cont11" id="employee-active">
              02
            </div>
            <div className="lp-cont12">
              <img src={images.tick} alt="" className="lp-img2" />
            </div>
          </div>
          <div className="lp-cont10">
            <div className="lp-cont11">03</div>
            <div className="lp-cont12">
              <img src={images.tickd} alt="" className="lp-img2" />
            </div>
          </div>
          <div className="lp-cont10">
            <div className="lp-cont11">04</div>
            <div className="lp-cont12">
              <img src={images.wrong} alt="" className="lp-img2" />
            </div>
          </div> */}
        </div>
      </div>
      <div className={AttendanceEmployeeState ? "hidediv-popup" : "lp-cont13"}>
        <img src={images.finger} alt="" className="lp-img3" />
        <span className="lp-text5">
          Update your today's Attendance By giving your Finger Print there.
        </span>
        <img
          src={images.add}
          alt=""
          onClick={() => {
            OpenPopup();
          }}
          className="lp-img4"
        />
      </div>
      {AttendanceEmployee.map((data) => {
        return (
          <div
            className={!AttendanceEmployeeState ? "hidediv-popup" : "lp-cont13"}
            id={!AttendanceEmployeeState ? "hidediv-popup" : "lp-attendance"}
          >
            <div className="attendance-div1">{data.DaysData}</div>
            <div className="attendance-sub">
              <div className="attendance-sub2">
                <span className="attendance2">Login Time : </span>{" "}
                <span className="attendance1">{data.TimeStart}</span>
              </div>
              <div className="attendance-sub2">
                <span className="attendance2">Logout Time : </span>{" "}
                <span className="attendance1">{data.TimeEnd}</span>
              </div>
              <div className="attendance-sub2">
                <span className="attendance2">Time Worked : </span>{" "}
                <span className="attendance1">{data.TimeSpent}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* <div className="lp-cont13">
        <img src={images.finger} alt="" className="lp-img3" />
        <span className="lp-text5">
          Update your today's Attendance By giving your Finger Print there.
        </span>
        <img
          src={images.add}
          alt=""
          onClick={() => {
            OpenPopup();
          }}
          className="lp-img4"
        />
      </div> */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="lp-popup-cont5">
          <img
            src={images.close}
            alt=""
            className="lp-popup-img5"
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
        <DialogTitle id="alert-dialog-title">
          <div className="lp-popup-cont1">
            <div
              className={
                popupnavdisplay[0] ? "lp-popup-cont6" : "hidediv-popup"
              }
            >
              <span className="lp-popup-text1">
                Set Employee
                <span className="lp-popup-text2"> Finger Print</span> For Your
                <br /> Attendance System
              </span>
            </div>
            <div
              className={
                popupnavdisplay[1] ? "lp-popup-cont6" : "hidediv-popup"
              }
            >
              <span className="lp-popup-text1">
                To add a<span className="lp-popup-text2"> New Employee,</span>{" "}
                please provide the following details:
                <span className="lp-popup-text2">
                  <br />
                  Employee ID, name, and designation.
                </span>
              </span>
            </div>
            <div
              className={
                popupnavdisplay[2] ? "lp-popup-cont6" : "hidediv-popup"
              }
            >
              <span className="lp-popup-text1">
                Once the fingerprint has been
                <span className="lp-popup-text2"> successfully added,</span> the
                employee's information is automatically added to the database.
              </span>
            </div>
          </div>
        </DialogTitle>
        <div className="lp-popup-cont2">
          <div
            className={popupnavdisplay[0] ? "lp-popup-cont4 " : "hidediv-popup"}
          >
            <img src={images.addfinger} alt="" className="lp-popup-img1" />
          </div>
          <div
            className={
              popupnavdisplay[1] ? "lp-popup-cont11 " : "hidediv-popup"
            }
          >
            <TextField
              id="outlined-basic ps-design"
              style={{
                width: "30%",
                borderRadius: "5px",
              }}
              label="ID"
              required
              //   value={firstName}
              variant="outlined"
              helperText="Employee ID"
              onChange={(e) => {
                setEmployeID(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic ps-design"
              style={{
                width: "65%",
                borderRadius: "5px",
              }}
              label="Name"
              required
              //   value={firstName}
              variant="outlined"
              helperText="Employee Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic ps-design"
              style={{
                width: "100%",
                borderRadius: "5px",
                marginTop: "0.7rem",
              }}
              label="Designation"
              required
              //   value={firstName}
              variant="outlined"
              helperText="Employee Designation"
              onChange={(e) => {
                setDesignation(e.target.value);
              }}
            />
          </div>
          <div
            className={popupnavdisplay[2] ? "lp-popup-cont4" : "hidediv-popup"}
            id="borderBlue"
          >
            <img src={images.addedfinger} alt="" className="lp-popup-img1" />
          </div>
          <div className="lp-popup-cont3">
            <img
              src={popupnav[0] ? images.activecircle : images.notactivecircle}
              alt=""
              className="lp-popup-img2"
            />
            <img
              src={popupnav[1] ? images.activeline : images.notactiveline}
              alt=""
              className="lp-popup-img3"
            />
            <img
              src={popupnav[1] ? images.activecircle : images.notactivecircle}
              alt=""
              className="lp-popup-img2"
            />
            <img
              src={popupnav[2] ? images.activeline : images.notactiveline}
              alt=""
              className="lp-popup-img3"
            />
            <img
              src={popupnav[2] ? images.activecircle : images.notactivecircle}
              alt=""
              className="lp-popup-img2"
            />
          </div>
          <div className="lp-popup-cont7">
            <Button
              variant="contained"
              component="label"
              id="resumebutton"
              style={{ fontSize: "16px", marginTop: "1rem" }}
              onClick={(e) => {
                if (popupnavdisplay[1]) {
                  if (EmployeID == [] || Name == [] || Designation == []) {
                    alert("Please Fill all the Fields");
                    return;
                  }
                  console.log(EmployeID);
                  e.preventDefault();
                  let NewEmployeeData = {
                    EmployeeName: Name,
                    EmployeeDesgination: Designation,
                  };
                  let DeviceTrigger = {
                    fotaupdate: false,
                    switchstate: true,
                    switchuser: parseInt(EmployeID, 10),
                    deletestate: false,
                    deleteuser: "",
                  };
                  let address = "UsersData/" + EmployeID;
                  let address2 = "Device1/";
                  get(child(dbRef, address)).then((snapshot) => {
                    if (snapshot.exists()) {
                      let text =
                        "User Already Exists, Do you want to Update it";
                      if (window.confirm(text) == true) {
                        alert("Employee Data Updated");
                        update(ref(db, address), NewEmployeeData);
                        update(ref(db, address2), DeviceTrigger);
                        PopupNavHandler(2);
                        PopupNavDisplayHandler(2);
                      } else {
                        return;
                      }
                    } else {
                      set(ref(db, address), NewEmployeeData);
                      set(ref(db, address2), DeviceTrigger);
                      alert("Employee Added Successfully");
                      PopupNavHandler(2);
                      PopupNavDisplayHandler(2);
                    }
                  });
                }
                if (!clickEvent) {
                  PopupNavHandler(1);
                  PopupNavDisplayHandler(1);
                  setclickEvent(true);
                } else {
                  // PopupNavHandler(2);
                  // PopupNavDisplayHandler(2);
                }
                if (popupnav[2]) {
                  setOpen(false);
                  PopupNavHandler(0);
                  PopupNavDisplayHandler(0);
                  setclickEvent(false);
                }
                console.log(clickEvent);
              }}
            >
              {popupnav[2] ? "Close" : popupnav[1] ? "Add" : "Next"}
            </Button>
          </div>
          <span className="lp-popup-text2">
            To enroll a new fingerprint, please keep the enrolled employee's
            finger on the scanner for registration before proceeding to add the
            new fingerprint.
          </span>
        </div>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
