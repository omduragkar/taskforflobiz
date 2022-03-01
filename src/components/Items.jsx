import { ArrowUpDownIcon, Icon, Search2Icon } from '@chakra-ui/icons';
import { FormLabel, Heading, Input, InputGroup, InputRightAddon, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function Items({ data, setFind }) {
    const [tabledata, setTabledata] = useState([...data]);
    const [ss, setSs] = useState({});
    const [sorto, setSorto] = useState({
        item_name: false
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
            let x = data.filter(v=>new RegExp(ss.search, "i").test(v.item_name));
            let y = data.filter(v=>(!new RegExp(ss.search, "i").test(v.item_name)));
            let z = y.filter(v=>new RegExp(ss.search, "i").test(v.item_code));
            console.log(x);
            setTabledata([...x, ...z]);

        }else{
            setTabledata([...data]);    
        }
    }
    const sortify =(e)=>{
        let tag = "item_name";
        if(sorto[tag] === false){
            let x = tabledata.sort((a, b)=>{
                return a[tag].localeCompare(b[tag])
            });
            setTabledata([...x]);
            setSorto({ [tag]:true});
        }else{
            let x = tabledata.sort().reverse();
            setTabledata([...x]);
            // setSorto(prev=>({...prev, [tag]:false}));
        }

        
    }
  return (
    <VStack w={"70%"} px="5" align={"center"} py={"5"} variant='simple' overflowY={"scroll"} minH="38rem" h={"40rem"}>
        <Heading border={"2px"} borderEndWidth={"0"} borderLeftWidth={"0"} borderColor="gray.200"  w={"100%"} p={"2"}>Items</Heading>
        <VStack w={"95%"}>
            
            <InputGroup>
                <Input name="search"
                    placeholder='search on the basis of item name and item code'
                    onChange={e=>setSs({...ss, [e.target.name]: e.target.value})} value={ss.search || ""}></Input>
                <InputRightAddon onClick={search} cursor={"pointer"}><Icon as={Search2Icon}/></InputRightAddon>
            </InputGroup>
            <Text w="90%" color={"red"}>Search with empty input to get full List</Text>
            <hr/>
            <Table>
                <Thead>
                    <Tr>
                    <Th name="item_name">Item Name {<Icon as={ArrowUpDownIcon} cursor={"pointer"} onClick={e=>sortify(e)} /> }</Th>
                    <Th name="item_code">Item Code </Th>
                    <Th isNumeric  name="sales_price">Selling Price </Th>
                    <Th isNumeric name="purchase_price">Purchase Price</Th>
                    <Th name="unit">Unit </Th>
                    <Th name="date">Date</Th>
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