function required(name: string){
    return {
        validator: (value: string) => value != "" && value !== undefined && value !== null,
        message: `A value is required for ${name}`
    }
}

function minLength(name: any, minLength: number){
    return {
        validator: (value: string) => value.length >= minLength,
        message: `At least is  ${minLength} characters`
    }
}

function alpha(name: string){
    return {
        validator: (value: string) => /^[a-zA-Z]*$/.test(value),
        message: `${name} can only contain letters`
    }
}

function numeric(name: string){
    return {
        validator: (value: string) => /^[0-9]*$/.test(value),
        message: `${name} can only contain digits`
    }
}

function range(name: string, min: number, max: number) {    
    return {
        validator: (value: number) => value >= min && value <= max,
        message: `${name} must be between ${min} and ${max}`
    }   
}

export default {
    name: [ minLength("Name", 3) ],
    category: [required("Category"), alpha("Category")],
    price: [ numeric("Price"), range("Price", 1, 1000)]
}