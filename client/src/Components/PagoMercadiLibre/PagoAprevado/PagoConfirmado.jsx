import React from "react";
import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Heading, Flex } from "@chakra-ui/react";
const PagoConfirmado = () => {
  return (
    <>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        <>
          <Box textAlign="center" py={10} px={6} my={"150px"}>
            <Box display="inline-block">
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                bg={"green.500"}
                rounded={"50px"}
                w={"55px"}
                h={"55px"}
                textAlign="center"
              >
                <CheckCircleIcon boxSize={"20px"} color={"white"} />
              </Flex>
            </Box>
            <Heading as="h2" size="xl" mt={6} mb={2}>
              Su pago fue Confirmado! Gracias por tu compra
            </Heading>
            <Link to="/" style={{ color: "black" }}>
              Regresa al
              <span style={{ color: "#659DF6", fontWeight: "bolder" }}>
                {" "}
                inicio para continuar
              </span>
            </Link>
          </Box>
        </>
      </div>
    </>
  );
};

export default PagoConfirmado;
