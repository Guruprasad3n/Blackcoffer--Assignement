import dashboardModel from "../Models/dashboardModel.js";

export const createData = async (req, res) => {
  try {
    const data = new dashboardModel(req.body);
    await data.save();
    return res
      .status(201)
      .send({ message: "data is Created Successfull", data });
  } catch (error) {
    console.log("Error in Create Data");
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
export const getData = async (req, res) => {
  try {
    const data = await dashboardModel.find({});
    return res.status(200).send({
      message: "Data Fetched Successfully",
      length: data.length,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
