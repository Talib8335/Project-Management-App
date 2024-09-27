import fs from "fs"
const args = process.argv.slice(2)
const lowerCaseArrray = args.map((item)=>item.toLowerCase())
const service = lowerCaseArrray.join("-")

const getCollectionName = ()=>{
    const modified = service.split("-").join("")
    const firstLetter = modified[0].toUpperCase()
    const collection = `${firstLetter}${modified.slice(1)}`
    return collection
}

try {
    fs.mkdirSync(`./src/${service}`)
    fs.writeFileSync(`./src/${service}/${service}.routes.ts`, '')
    fs.writeFileSync(`./src/${service}/${service}.controller.ts`, '')
    fs.writeFileSync(`./src/${service}/${service}.schema.ts`, '')
    fs.writeFileSync(`./src/${service}/${service}.dto.ts`, '')
    const serverFile = fs.readFileSync("./src/index.ts", "utf8")
    const fileArray = serverFile.split("\n")
    
    // Adding basic code architecure example to schema
    const schemaSample = [
        "import {Schema, model} from 'mongoose'\n",
        "const modelSchema = new Schema({",
        "\t",
        "},{timestamps: true})\n",
        `const ${getCollectionName()}Schema = model("${getCollectionName()}", modelSchema)\n`,
        `export default ${getCollectionName()}Schema`
    ]
    fs.writeFileSync(`./src/${service}/${service}.schema.ts`,schemaSample.join("\n"))

    // Adding basic code architecure example to controller
    const controllerSample = [
        "import { Request, Response } from 'express'",
        `import ${getCollectionName()}Schema from './${service}.schema'`,
        "import Catch from '../../lib/catch.lib'\n",
        "export const fetch = Catch(async (req: Request, res: Response)=>{",
        "\tres.status(200).json({success: true}) ",
        "})\n"
    ]
    fs.writeFileSync(`./src/${service}/${service}.controller.ts`,controllerSample.join("\n"))
    
    const statements: any[] = []

    for(let data of fileArray)
    {
        statements.push(data)
        if(data === '// Routes\r')
            statements.push(`import ${service.split("-").join("")}Router from './${service}/${service}.routes'`)
    }

    // Setup endpoint
    statements.push(`app.use('/${service}', ${service.split("-").join("")}Router)`)

    const original = statements.join("\n")
    fs.writeFileSync("./src/index.ts", original, "utf8")
    
    // Writing login in route file
    const routeSample = [
        `import {fetch} from './${service}.controller'`,
        "import express from 'express'",
        "const router = express.Router()\n",
        "router.get('/', fetch)\n",
        "export default router"
    ]
    fs.writeFileSync(`./src/${service}/${service}.routes.ts`,routeSample.join("\n"))
    console.log("Success !")
}
catch(err: any)
{
    console.log(`${service} is already exist !`)
}
