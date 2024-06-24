import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import RestaurantRatingImg from '../../assets/icons/estrela.png'
import Tag from '../../components/Tag'
import Botao from '../Button'
import ModalPoupap from '../Modal'
import {
  CardConteiner,
  CardRestaurant,
  ContainerDescritivo,
  Imagem,
  Infos,
  LineSection,
  RatingStar
} from './styles'

export type Props = {
  image: string
  infos: string[]
  title: string
  nota: number
  description: string
  to: string
  background: 'light' | 'dark'
}

export const formatPreco = (preco = 0) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco)
}

const Products = ({
  image,
  infos,
  title,
  nota,
  description,
  to,
  background
}: Props) => {
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<Props | null>(null)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleButtonClick = () => {
    if (location.pathname === '/') {
      window.location.href = to
    } else {
      setCurrentItem({
        image,
        infos,
        title,
        nota,
        description,
        to,
        background
      })
      toggleModal()
    }
  }

  return (
    <div className="container">
      <CardConteiner>
        <CardRestaurant>
          <Imagem style={{ backgroundImage: `url(${image})` }} />
          <Infos>
            {infos.map((info) => (
              <Tag key={info}>{info}</Tag>
            ))}
          </Infos>
          <ContainerDescritivo>
            <LineSection>
              <h3 className="tituloCard">{title}</h3>
              <div className="Rating">
                <h3 className="nota">{nota}</h3>
                <RatingStar
                  style={{ backgroundImage: `url(${RestaurantRatingImg})` }}
                />
              </div>
            </LineSection>
            <p>{description}</p>
            {location.pathname === '/' ? (
              <Botao
                type="link"
                to={to}
                title="Saiba mais"
                background={background}
              >
                Saiba mais
              </Botao>
            ) : (
              <Botao
                type="button"
                onClick={handleButtonClick}
                title="Adicionar ao carrinho"
                background={background}
              >
                Adicionar ao carrinho
              </Botao>
            )}
          </ContainerDescritivo>
        </CardRestaurant>
      </CardConteiner>
      {isModalOpen && currentItem && (
        <ModalPoupap item={currentItem} onClose={toggleModal} />
      )}
    </div>
  )
}

export default Products
