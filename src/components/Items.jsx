import { Heading, Input, InputGroup, InputRightAddon, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function Items({ data, setFind }) {
    const [tabledata, setTabledata] = useState([...data]);
    const [ss, setSs] = useState({});
    const [sorto, setSorto] = useState({
        item_name: false,
        item_code: false,
        sales_price:false,
        purchase_price: false,
        unit:false,
        date: false
    });
    useEffect(()=>{
        if(data){
            setTabledata([...data]);
        }else{
            setTabledata([]);
        }
    },[data])
    const search = ()=>{
        if(ss.search !== ""){
            let x = tabledata.filter(v=>new RegExp(ss.search, "i").test(v.item_name));
            console.log(x);
            setTabledata([...x]);

        }else{
            setTabledata([...data]);    
        }
    }
    const sortify =(e)=>{
        let tag = e.target.getAttribute("name");
        if(sorto[tag] == false){
            let x = tabledata.sort((a, b)=>{
                return a[tag].localeCompare(b[tag])
            });
            setTabledata([...x]);
            setSorto(prev=>({...prev, [tag]:true}));
        }else{
            let x = tabledata.sort((a, b)=>{
                return a[tag].localeCompare(b[tag])
            });
            x = x.reverse();
            setTabledata([...x]);
            setSorto(prev=>({...prev, [tag]:false}));
        }

        
    }
  return (
    <VStack w={"70%"} px="5" align={"center"} py={"5"} variant='simple' overflowY={"scroll"} minH="38rem" h={"40rem"}>
        <Heading border={"2px"} borderEndWidth={"0"} borderLeftWidth={"0"} borderColor="gray.200"  w={"100%"} p={"2"}>Items</Heading>
        <VStack w={"95%"}>
            <InputGroup>
                <Input name="search" onChange={e=>setSs({...ss, [e.target.name]: e.target.value})} value={ss.search || ""}></Input>
                <InputRightAddon onClick={search} cursor={"pointer"}>Search</InputRightAddon>
            </InputGroup>
            <hr/>
            <Table>
                <Thead>
                    <Tr>
                    <Th onClick={e=>sortify(e)} name="item_name">Item Name{sorto.item_name?"+":"-"}</Th>
                    <Th onClick={e=>sortify(e)} name="item_code">Item Code{sorto.item_code?"+":"-"}</Th>
                    <Th isNumeric  onClick={e=>sortify(e)} name="sales_price">Selling Price{sorto.sales_price?"+":"-"}</Th>
                    <Th isNumeric onClick={e=>sortify(e)} name="purchase_price">Purchase Price{sorto.purchase_price?"+":"-"}</Th>
                    <Th onClick={e=>sortify(e)} name="unit">Unit{sorto.unit?"+":"-"}</Th>
                    <Th onClick={e=>sortify(e)} name="date">Date{sorto.date?"+":"-"}</Th>
                    </Tr>
                </Thead>
                    {console.log(data)}
                    {tabledata && tabledata.length>0?
                        <Tbody>
                            {tabledata.map(td=>(
                                <Tr key={td.item_code} id={td.item_code} onClick={e=>{
                                    console.log(e.target.parentNode.getAttribute("id"));
                                    let x = e.target.parentNode.getAttribute("id");
                                    setFind(x);
                                }}>
                                    <Td>{td.item_name}</Td>
                                    <Td>{td.item_code}</Td>
                                    <Td isNumeric>{td.sales_price}</Td>
                                    <Td isNumeric>{td.purchase_price}</Td>
                                    <Td>{td.unit}</Td>
                                    <Td>{td.date}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    :
                    <Heading>No data Exists!</Heading>
                }
            </Table>
        </VStack>
    </VStack>
  )
}

export default Items