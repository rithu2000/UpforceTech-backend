import fs from 'fs'
import { userModel } from "../models/userModel.js";
import { Parser } from 'json2csv';

export async function userRegister(req, res) {
    try {
        const data = req.body;
        if (req.file && data) {
            //image
            const { path, originalname } = req.file;
            const splitted = originalname.split(".");
            const extension = splitted[splitted.length - 1];
            const newPath = path + "." + extension;
            fs.renameSync(path, newPath);
            let uploadFile = newPath;
            let regName = /^[a-zA-Z\s]+$/;
            let regMobile = /^[0-9]{10}$/;
            //validation
            console.log('ethunununununddooooooo');
            if (regName.test(data.firstName && data.lastName)) {
                if (regMobile.test(data.mobile)) {
                    const existUser = await userModel.findOne({ email: data.email });
                    if (!existUser) {
                        let user = await userModel.create({
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            gender: data.gender,
                            profile: uploadFile,
                            mobile: data.mobile,
                            status: data.status,
                            location: data.location,
                        });
                        res.status(200).json({
                            status: "success",
                            message: "Registraion completed",
                            user,
                        });
                    } else {
                        res.status(400).json({
                            status: "failed",
                            message: "This Email is already registered!!",
                        });
                    }
                } else {
                    res.status(400).json({ status: "failed", message: "Invalid Mobile Number !" });
                }
            } else {
                res.status(400).json({ status: "failed", message: "Invalid Name !" });
            }
        } else {
            res.status(400).json({ status: "failed", message: "All fields are required !" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error })

    }
}

export async function getUsers(req, res) {
    try {
        const { limit, page } = req.query;
        let pages = page - 1;
        const userDetails = await userModel
            .find()
            .skip(pages * limit)
            .limit(limit)
            .sort({ updatedAt: -1 });
        res.status(200).json(userDetails);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message })

    }
}

export async function delelteUser(req, res) {
    try {
        const userId = req.body.id;
        await userModel.findByIdAndDelete(userId);
        res.status(200).json({ status: "success", message: "deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message })

    }
}

export async function getEdituser(req, res) {
    try {
        const userId = req.query.id;
        const user = await userModel.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message })

    }
}

export async function userSearch(req, res) {
    try {
        const search = req.query.name;
        if (search === "") {
            let searchUser = await userModel.find().sort({ updatedAt: -1 });
            res.json(searchUser);
        } else {
            let searchUser = await userModel
                .find({ firstName: { $regex: search, $options: "i" } })
                .sort({ updatedAt: -1 });
            res.status(200).json(searchUser);
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message })

    }
}

export async function editUser(req, res) {
    try {
        let obj = req.body;
        let userId = req.params.userId;
        //image
        const { path, originalname } = req.file;
        const splitted = originalname.split(".");
        const extension = splitted[splitted.length - 1];
        const newPath = path + "." + extension;
        fs.renameSync(path, newPath);
        let uploadFile = newPath;

        await userModel.findByIdAndUpdate(userId, {
            firstName: obj.firstName,
            lastName: obj.lastName,
            email: obj.email,
            gender: obj.gender,
            profile: uploadFile,
            mobile: obj.mobile,
            status: obj.status,
            location: obj.location,
        })
        res.status(200).json({ status: 'success', 'message': 'updated successfylly' })


    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })

    }
}

export async function exportCsv(req, res) {
    try {
        const data = await userModel.find({}, 'firstName lastName email gender  mobile status').sort({ updatedAt: -1 });

        const dataWithIndex = data.map((row, index) => {
            return {
                ID: index + 1,
                firstName: row.firstName,
                lastName: row.lastName,
                email: row.email,
                gender: row.gender,
                mobile: '+91 ' + row.mobile,
                status: row.status,
            };
        });
        const fields = ['ID', 'firstName', 'lastName', 'email', 'gender', 'mobile', 'status'];

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(dataWithIndex);

        res.header('Content-Type', 'text/csv');
        res.attachment('user_data.csv');
        res.status(200).send(csv);

    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })

    }
}

export async function getOneUser(req, res) {
    try {
        const userId = req.query.id;
        const user = await userModel.findById(userId);
        res.status(200).json(user)

    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}