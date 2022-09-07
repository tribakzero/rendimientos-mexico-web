import Head from 'next/head'
import Image from 'next/image'
import { formatRelative, formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'
import styles from '../styles/Home.module.css'

export default function Home({data = {}}) {
  const Rate = ({value}) => (
    <span className={value && ( value > data.inflation ? styles.aboveInflation : styles.belowInflation )}>
      { value ? value + '%' : '---' }
    </span>
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Rendimientos México</title>
        <meta name="description" content="Vista clara de los rendimientos que ofrecen diferentes instrumentos en México" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Tasa de rendimientos por plazo de inversión
        </h1>

        <p className={styles.description}>
          Rendimientos en constante actualización
        </p>

        {data.instruments
          ? (
            <>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Instrumento</th>
                    <th>Diario</th>
                    <th>7 días</th>
                    <th>1 mes</th>
                    <th>2 meses</th>
                    <th>3 meses</th>
                    <th>6 meses</th>
                    <th>9 meses</th>
                    <th>1 año</th>
                    <th>1 año (rendimiento mensual)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.instruments.map(instrument => (
                    <tr key={instrument.name}>
                      <td>
                        <Image
                          src={`/images/${instrument.name}.png`}
                          alt={instrument.name}
                          title={instrument.name}
                          className={styles.logos}
                          width="100"
                          height="50"
                          unoptimized
                        />
                      </td>
                      <td><Rate value={instrument['1']} /></td>
                      <td><Rate value={instrument['7']} /></td>
                      <td><Rate value={instrument['28']} /></td>
                      <td><Rate value={instrument['60']} /></td>
                      <td><Rate value={instrument['90']} /></td>
                      <td><Rate value={instrument['180']} /></td>
                      <td><Rate value={instrument['270']} /></td>
                      <td><Rate value={instrument['365']} /></td>
                      <td><Rate value={instrument['365_2']} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.tableFooter}>
                <span>
                  <strong>Última actualización:</strong>
                  {' '}
                  {
                    formatRelative(new Date(data.timestamp._seconds * 1000), new Date(), { locale: es })
                  }
                  {' '}
                  ({
                    formatDistance(new Date(data.timestamp._seconds * 1000), new Date(), { locale: es, addSuffix: true })
                  })
                </span>
                <span><strong>Inflación actual:</strong> {data.inflation}%</span>
                <span><strong className={styles.belowInflation}>Rojo:</strong> Rendimiento inferior o igual a la inflación.</span>
                <span><strong className={styles.aboveInflation}>Verde:</strong> Rendimiento superior a la inflación.</span>
              </div>
            </>
          )
          : (<div>loading...</div>)
        }
      </main>

      <footer className={styles.footer}>
        <a href="https://github.com/tribakzero">
          Con todo el cocoro{' '}, por tribak
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, max-age=86400, must-revalidate, s-maxage=3600, stale-while-revalidate=3600, stale-if-error=14400'
  )

  const response = await fetch(process.env.EXTERNAL_DATA_URL);
  const data = await response.json();

  return {
    props: {
      data
    }
  }
}
