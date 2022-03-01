import { CheckIcon, Icon } from '@chakra-ui/icons';
import { Button, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputLeftElement, Select, Text, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import DatePicker  from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";
function Edit({ data, setData, find, setFind }) {
    const [svdata, setSvdata] = useState({});
    const toast = useToast()
    useEffect(()=>{
        let x = data.find(v=>v.item_code == find);
        if(x){
            setSvdata(data.find(v=>v.item_code == find));
        }else{
            setSvdata({});
        }
    },[find, data])


    const iphandler = (e)=>{
        setSvdata(prev=>({...prev, [e.target.name]:e.target.value}))
    }
    const submithandler = ()=>{
        // console.log(svdata)
        if( !svdata.item_code || !svdata.item_name)
        {
            toast({
                title: 'Please Fill all the field!',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                variant:"left-accent",
              })
            }else{
                // svdata.date = svdata.date.split("-").reverse().join("-");
                let fdata = data.findIndex(v=>v.item_code == svdata.item_code);
                if(fdata != -1){
                    let newarr = [...data];
                    newarr[fdata] = svdata;
                    localStorage.setItem("datarr", JSON.stringify(newarr));
                    setData([...newarr]);
                    toast({
                        title: 'Updated!',
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                        variant:"left-accent",
                    })

                }else{
                    localStorage.setItem("datarr", JSON.stringify([...data, svdata]));
                    setData(prev=>[...prev, svdata]);
                    toast({
                        title: 'Saved!',
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                        variant:"left-accent",
                    })
                    
                    
                }
                setSvdata({});
                setFind("");
                // console.log(data);
            }
    }
    
  return (
    <VStack w={"30%"} px="5" align={"center"} >
        <Heading border={"2px"} borderEndWidth={"0"} borderLeftWidth={"0"} borderColor="gray.200"  w={"100%"} p={"2"}>Create/Edit</Heading>

        <HStack>
            <FormControl isRequired >
                <FormLabel htmlFor='item_name'>Item Name </FormLabel>
                <Input name='item_name' id={"item_name"} value={svdata.item_name || ""} onChange={e=>iphandler(e)} required></Input>                   
            </FormControl>
            <FormControl isRequired>
                <FormLabel htmlFor='item_code'>Item Code </FormLabel>
                <Input name='item_code' id='item_code' value={svdata.item_code || ""} onChange={e=>iphandler(e)} required></Input>                   
            </FormControl>
        </HStack>
        <Text w={"100%"} bgColor={"gray.100"} color={"blackAlpha.800"} p={"2"} rounded={"sm"} fontWeight={"medium"}>Stock and Pricing Deatils(Optional)</Text>
        <HStack>
            <FormControl >
                <FormLabel required>Sales Price </FormLabel>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        color='gray.300'
                        fontSize='1.2em'
                        children='₹'
                        />
                    <Input name='sales_price' value={svdata.sales_price || ""} onChange={e=>iphandler(e)} required></Input>                   
                </InputGroup>
                                
            </FormControl>
            <FormControl >
                <FormLabel required>Purchase Price </FormLabel>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        color='gray.300'
                        fontSize='1.2em'
                        children='₹'
                        />
                    <Input name='purchase_price' value={svdata.purchase_price || ""} onChange={e=>iphandler(e)} required></Input>                                      
                </InputGroup>
            </FormControl>
        </HStack>
        <HStack>
            <FormControl >
                <FormLabel required>Measuring Unit </FormLabel>
                <Select placeholder='Select Unit' onChange=
                {e=>setSvdata(prev=>({...prev, unit:e.target.value}))} value={svdata.unit || ""}>
                    <option value='pcs'>pcs</option>
                    <option value='boxes'>boxes</option>
                    <option value='gms'>gms</option>
                    <option value='kgs'>kgs</option>
                    <option value='ltr'>ltr</option>
                </Select>                  
            </FormControl>
            <FormControl >
                <FormLabel required>Opening Stock Date: </FormLabel>
                <div>
                    {/* <DatePicker selected={  new Date() } onChange={(date) => setSvdata(prev=>({...prev, date:date.valueOf()}))} /> */}
                    <DatePicker
                    selected={svdata.udate ? new Date(svdata.udate ) : new Date()}
                    onChange={(e) =>{
                        // console.log(e);
                        setSvdata(prev=>({...prev, date:e.toDateString(), udate:e}))
                        // console.log(svdata);
                        // console.log(new Date(svdata.udate))
                    }
                    } />
                </div>
                {/* <Input type={"date"} name={"date"} onChange={e=>iphandler(e)} ></Input> */}
            </FormControl>
        </HStack>
        <Button colorScheme='messenger' w={"80%"} my="3" onClick={submithandler}><Icon as={CheckIcon}/> &nbsp;SAVE </Button>
    </VStack>

  )
}

export default Edit