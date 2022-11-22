import { Box, VStack, Link, Image, Flex } from '@chakra-ui/react'
import Styles from './Sidebar.module.scss'

// importar imágenes
import dashboard_black from "../../../../assets/images/dashboard_black.png"
import dashboard_white from "../../../../assets/images/dashboard_white.png"
import docs_black from "../../../../assets/images/docs_black.png"
import docs_white from "../../../../assets/images/docs_white.png"
import users_black from "../../../../assets/images/users_black.png"
import users_white from "../../../../assets/images/users_white.png"
import logout from "../../../../assets/images/logout.svg"
import logo from "../../../../assets/images/logo.png"

import { useAuthStore } from '../../../../hooks/usAuthStore'

export default function Sidebar(props) {
  const {startLogout}=useAuthStore();

  const LinkItems = [
    { 
      name: 'Tablero Principal', 
      icon: dashboard_black,
      ref: '/',
      class: Styles.topics,
    },
    {
      name: 'Documentos',
      icon: docs_black,
      ref: '/Documentos',  
      class: Styles.topics,
    },
    {
      name: 'Usuarios',
      icon: users_black,
      ref: '/Usuarios',
      class: Styles.topics,
    }
  ]
  const { actual, UseAuth } = props
  const Items = LinkItems.map((link) => {
    if (link.name === actual) {
      link.class = [link.class, Styles.active].join(' ')
      link.icon = link.icon.replace('black', 'white')
    }
    return link
  })
  /*
    La sidebar en sí
  */
  return (
    <Box pos="fixed" className={Styles.sidebar}>
      <Link style={{ textDecoration: 'none' }} href="/">
          <Image src={logo} w="15vw" padding="2rem" margin="1rem 0 0 1rem " />
      </Link>
      <VStack alignItems="start">
        {Items.map((link) => (
          <Link key={link.name} style={{ textDecoration: 'none' }} href={link.ref}>
              <Flex className={link.class} alignContent="center" /* paddingLeft="2vw" */>
                <Image
                  src={`${link.icon}`}
                  alt={link.name}
                  w="1.5vw"
                  mr="16px"
                  ml="2.5vw"
                />
                {link.name}
              </Flex>
          </Link>
        ))}
        <Box paddingTop="4vw" position="sticky">
          <Link style={{ textDecoration: 'none' }} href="/auth/login">
              <Flex
                alignContent="center"
                className={Styles.logout}
                onClick={
                  //event.preventDefault()
                  //UseAuth.signOut()
                  startLogout
                }
              >
                <Image
                  src={logout}
                  alt="Cerrar Sesión"
                  w="1.5vw"
                  mr="16px"
                  ml="2.5vw"
                />
                Cerrar Sesión
              </Flex>
          </Link>
        </Box>
      </VStack>
      <Image
        src={docs_white}
        w="2px"
        mr="2px"
        ml="2px"
      />
      <Image
        src={dashboard_white}
        w="2px"
        mr="2px"
        ml="2px"
      />
      <Image
        src={users_white}
        w="2px"
        mr="2px"
        ml="2px"
      />
    </Box>
  )
}
