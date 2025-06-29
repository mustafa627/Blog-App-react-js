import DashboardLayoutBasic from "../../CMP/AdminLayout";
import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {
    Button,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const AllUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getDocs(collection(db, "users"));
      const tempArr = [];
      res.forEach((doc) => {
        const obj = { ...doc.data(), id: doc.id };
        if (obj.type !== "admin") {
          tempArr.push(obj);
        }
      });
      setAllUsers(tempArr);
    })();
  }, [refresh]);

  // console.log("allUsers", allUsers)

  const userUpdate = async (event) => {
    console.log("event", event.target.checked);
    console.log("event id", event.target.id);
    await updateDoc(doc(db, "users", event.target.id), {
      isActive: event.target.checked,
    });
    setRefresh(!refresh);
  };

  return (
    <DashboardLayoutBasic>
      <h1 style={{textAlign: "center", marginBottom:"10px"}}>ALL USERS</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>FullName</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Is Active</TableCell>
              <TableCell>Action</TableCell>
 
            </TableRow>
          </TableHead>

          <TableBody>
            {allUsers.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell> {user.id} </TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{String(user.isActive)}</TableCell>
                  <TableCell>
                    {/* <Switch id={user.id} defaultChecked={user.isActive}
                                                onChange={userUpdate}
                                            /> */}
                    <Switch
                      id={user.id}
                      checked={user.isActive}
                      onChange={(e) => userUpdate(e, user.id)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardLayoutBasic>
  );
};

export default AllUser;
