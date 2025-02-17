/* eslint-disable array-callback-return */
import { useState, useEffect, useLayoutEffect } from "react";
import {
	TableContainer,
	Table,
	Tr,
	Th,
	Tbody,
	Td,
	Thead,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Flex,
	Box,
	Text,
} from "@chakra-ui/react";

import HeaderAdmin from "../Admin/HeaderAdmin";
import { IoIosArrowDown } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
const ObtenerProductosAdmin = () => {
	const [pedidos, setPedidos] = useState("");
	const [filtrados, setFiltrados] = useState("");

	useLayoutEffect(() => {
		window.scrollTo({ top: 0 });
		axios
			.get("/admin/envios")
			.then((res) => res.data)
			.then((fil) => fil?.filter((el) => el.payments[0].status === "approved"))
			.then((data) => setPedidos(data));
	}, []);

	function filtro(estado) {
		axios
			.get("/admin/envios")
			.then((res) => res.data)
			.then((fil) => fil?.filter((el) => el.payments[0].status === "approved"))
			.then((data) => setFiltrados(data))
			.then(() => {
				if (estado !== "Todos") {
					let filtrar = filtrados?.filter((el) => el.estado_envio === estado);
					setPedidos(filtrar);
				} else {
					axios
						.get("/admin/envios")
						.then((res) => res.data)
						.then((fil) =>
							fil?.filter((el) => el.payments[0].status === "approved")
						)
						.then((data) => setPedidos(data));
				}
			});
	}

	function color_estado(estado) {
		if (estado === "Completado") {
			return (
				<Text
					border="1px solid #00CA1B"
					p="10px"
					textAlign="center"
					m="auto"
					borderRadius="10px"
					fontWeight="extrabold"
					color="#00CA1B"
				>
					Completado
				</Text>
			);
		}
		if (estado === "Cancelado") {
			return (
				<Text
					border="1px solid #FF4E42"
					p="10px"
					textAlign="center"
					m="auto"
					borderRadius="10px"
					fontWeight="extrabold"
					color="#FF4E42"
				>
					Cancelado
				</Text>
			);
		}
		if (estado === "Procesando") {
			return (
				<Text
					border="1px solid #F6C644"
					p="10px"
					textAlign="center"
					m="auto"
					borderRadius="10px"
					fontWeight="extrabold"
					color="#F6C644"
				>
					Procesando
				</Text>
			);
		}
		if (estado === "Creado") {
			return (
				<Text
					border="1px solid #FF910B"
					p="10px"
					textAlign="center"
					m="auto"
					borderRadius="10px"
					fontWeight="extrabold"
					color="#FF910B"
				>
					Creado
				</Text>
			);
		}
	}

	return (
		<Flex>
			<HeaderAdmin />
			{pedidos?.length > 0 ? (
				<Box w="83%" m="auto" mt="30px">
					<Box h="500px" overflowY={"scroll"} borderRadius="10px" mt="30px">
						<TableContainer>
							<Table size={"md"} variant="striped" bg="#BFBFBF">
								<Thead bg="#242525" padding={"2px"}>
									<Tr>
										<Th color="#FFFF" textAlign={"center"}>
											Detalle de Productos
										</Th>
										<Th color="#FFFF" textAlign={"center"}>
											<Flex justifyContent="center">
												<Menu isLazy textAlign={"center"} autoSelect={false}>
													<MenuButton
														fontWeight={"extrabold"}
														textAlign="center"
													>
														<Flex align={"center"}>
															ESTADO
															<Box mx="3px">
																<IoIosArrowDown />
															</Box>
														</Flex>
													</MenuButton>
													<MenuList p={0} color={"#242525"}>
														<MenuItem
															onClick={() => filtro("Creado")}
															bg={"#242525"}
															color={"#FFFF"}
															_hover={{
																bg: "gray",
																color: "#FFFF",
															}}
														>
															Creado
														</MenuItem>

														<MenuItem
															onClick={() => filtro("Procesando")}
															bg={"#242525"}
															color={"#FFFF"}
															_hover={{
																bg: "gray",
																color: "#FFFF",
															}}
														>
															Procesando
														</MenuItem>
														<MenuItem
															onClick={() => filtro("Cancelado")}
															bg={"#242525"}
															color={"#FFFF"}
															_hover={{
																bg: "gray",
																color: "#FFFF",
															}}
														>
															Cancelado
														</MenuItem>
														<MenuItem
															onClick={() => filtro("Completado")}
															bg={"#242525"}
															color={"#FFFF"}
															_hover={{
																bg: "gray",
																color: "#FFFF",
															}}
														>
															Completado
														</MenuItem>
														<MenuItem
															onClick={() => filtro("Todos")}
															bg={"#242525"}
															color={"#FFFF"}
															_hover={{
																bg: "gray",
																color: "#FFFF",
															}}
														>
															Todos
														</MenuItem>
													</MenuList>
												</Menu>
											</Flex>
										</Th>
										<Th color="#FFFF" isNumeric>
											<Flex justifyContent="center">
												<Menu isLazy textAlign={"center"} autoSelect={false}>
													<Box fontWeight={"extrabold"} textAlign="center">
														<Flex align={"center"}>TOTAl</Flex>
													</Box>
												</Menu>
											</Flex>
										</Th>
										<Th color="#FFFF" textAlign={"center"}>
											Usuario
										</Th>
										<Th color="#FFFF" textAlign={"center"}>
											Direccion
										</Th>
									</Tr>
								</Thead>
								<Tbody textAlign={"center"} bg="#FFFF">
									{pedidos.length > 0 &&
										pedidos.map((elem) => {
											return (
												<Tr key={elem.id}>
													<Td padding={"0px"}>
														<Link to={`/admin/detalle/${elem.id}`} w="100%">
															<Td>
																<Flex>
																	<BiEditAlt mr="5px" />
																	<Box ml="15px">
																		{`  MODIFICAR PEDIDO N°: ${elem.id}`}
																	</Box>
																</Flex>
															</Td>
														</Link>
													</Td>
													<Td>{color_estado(elem.estado_envio)}</Td>
													<Td>$ {elem.payments[0].total_paid_amount}</Td>
													<Td>{elem.payer.email}</Td>
													<Td>{`${elem.shipments?.street_name} ${elem.shipments?.street_number} ${elem.shipments?.city_name}`}</Td>
												</Tr>
											);
										})}
								</Tbody>
							</Table>
						</TableContainer>
					</Box>
				</Box>
			) : (
				<Box w="80%" m="auto">
					<h2>No hay Pedidos</h2>
					<p>
						Espera a tener nuevos pedidos{" "}
						<span> y apareceran en este lugar</span>
					</p>
				</Box>
			)}
		</Flex>
	);
};

export default ObtenerProductosAdmin;
