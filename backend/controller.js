const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt=require('bcrypt');
const fs=require('fs');
const path = require('path');



const controller={

    register:async (req,res)=>{

        if(req.body.username&&req.body.password){
            try {
                const isPresent=await prisma.Users.findUnique({
                    where:{
                        username:req.body.username,
                    }
                })
                if(isPresent){
                    res.json({
                        message:"username is already taken"
                    })
                }else{
                const salt=await bcrypt.genSalt(10)
                let password=req.body.password
                if(typeof(password)==='number'){
                    const passwordString = password.toString()
                    password=passwordString
                }
                const hashedPassword = await bcrypt.hash(password, salt)
                const registerUser=await prisma.Users.create({
                    data:{
                        username:req.body.username,
                        password:hashedPassword 
                    }
                })
                res.status(200).json({
                    message:"registration is successfull",
                    user:registerUser
                })
            }
  
            } catch (error) {
                res.status(500).json({
                    message:"failed to register"
                })
                console.log(error)
            } 
        }else{
                res.json({
                    message:"you cannot register with any empty fields"
                })
            }
    
            
    },

    login:async (req,res)=>{
        if(req.body.username&&req.body.password){
            try {
                const userLogin=await prisma.Users.findUnique({
                    where:{
                        username:req.body.username,
                    }
                })
                
                const isMatch=bcrypt.compare(req.body.password,userLogin.password)
                if(userLogin.length==0 || !isMatch){
                    res.status(400).json({
                        message:"wrong username or password"
                    })
                }else{
                    res.status(200).json({
                        message:"login successfully",
                        userId:parseInt(userLogin.id)
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }else{
            res.json({
                message:"you cannot login with any empty fields"
            })
        }
        
    },


    readSongFile:async (req,res)=>{
        const userId=Number(req.params.id)
        const songCategory=req.params.category 
        const songName=req.params.name
        const songPath=path.join(__dirname,'SONGS',songCategory,songName)

        await fs.readFile(songPath, 'utf-8',(err,data)=>{
           
            if(err){
                res.send(err)
            }else{
                res.json(data)
            }
        })

        const findUser=await prisma.viewHistory.findMany({
            where:{
                userId:userId,
                songCategory:songCategory

            }
        })

        if(findUser.length===0){
            try {
                const addUser=await prisma.viewHistory.create({
                    data:{
                        songCategory:songCategory,
                        noOfreads:Number(1),
                        userId:userId
                    }
                })
                console.log(addUser)
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const userID=findUser[0].id
                const userReads=findUser[0].noOfreads
                const updateViewHistory=await prisma.viewHistory.update({
                    where:{
                        id:userID
                    },
                    data:{
                        noOfreads:userReads+1
                    }
                })

            } catch (error) {
                console.log(error)
            }
        }

    },

    getFiles:async (req,res)=>{
        const userId=Number(req.params.id)
        
        const findUser=await prisma.viewHistory.findMany({
            where:{
                userId:userId,        

            },
            orderBy:{
                noOfreads:'desc'
            }
        })

        if(findUser.length!==0){
            try {
                const songCategory=findUser[0].songCategory
                const songpath=path.join(__dirname,'SONGS',songCategory)  

                fs.readdir(songpath,(err,files)=>{
                    if(err){
                        res.status(400).send(err)
                    }else{
                        let allFiles=[{files:files,category:songCategory}]
                        const songpath2=path.join(__dirname,'SONGS')
                        fs.readdir(songpath2,(err,files)=>{
                            if(err){
                                console.log(err)
                            }else{
                                const list=files
                                const newList=list.filter(item=>item!==songCategory)
                                for (let SONGSDir of newList) {
                                    const dirPath = path.join(__dirname, 'SONGS', SONGSDir);
                                    const dirFiles = fs.readdirSync(dirPath);
                                    allFiles = allFiles.concat({files:dirFiles,category:SONGSDir});
                                  }
                                res.send(allFiles)
                            }
                        })
                        
                        
                    }
                }) 
                

            } catch (error) {
              console.log(error)  
            }


        }else{
            try {
                const allCategories=path.join(__dirname,'SONGS')
                
                
                fs.readdir(allCategories,(err,files)=>{
                    if(err){
                        console.log(err)
                    }else{
                      const filesInallCategories=files
                      let allFiles=[]
                      for(fileCategory of filesInallCategories){
                        const categoryPath=path.join(__dirname,'SONGS',fileCategory)
                        const files=fs.readdirSync(categoryPath)
                        console.log(files)
                        allFiles=allFiles.concat({files:files,category:fileCategory})
                        }

                    res.send(allFiles)

                    }
                })
    
  


            } catch (error) {
                
            }
        }
    }


}

module.exports=controller;