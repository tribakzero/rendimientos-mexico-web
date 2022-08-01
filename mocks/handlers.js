import { rest } from 'msw'

export const handlers = [
  rest.get(`${process.env.EXTERNAL_DATA_URL}`, (req, res, ctx) => {
    return res(
      ctx.json({
        inflation: 8.88,
        instruments: [
          {
            name: 'BONDDIA',
            '1': 7.75,
          },
          {
            name: 'CETES',
            '28': 8.05,
            '90': 8.62,
            '180': 9.34,
            '365': 9.66,
          },
          {
            name: 'SuperTasas',
            '1': 7.40,
            '90': 8.50,
            '180': 9,
            '365': 10,
            '365_2': 9.50,
          },
          {
            name: 'kubo.financiero',
            '1': 2,
            '7': 5,
            '28': 7.45,
            '90': 8.35,
            '180': 9.03,
            '365': 9.85,
          },
          {
            name: 'finsus',
            '28': 5.5,
            '60': 6.5,
            '90': 7.5,
            '180': 9,
            '270': 9.8,
            '365': 12.09,
            '365_2': 12.09,
          },
          {
            name: 'hey,',
            '1': 4,
            '7': 5,
          },
          {
            name: 'Hey Pro',
            '7': 8,
          },
          {
            name: 'DINN',
            '1': 4,
            '180': 7,
          },
          {
            name: 'Smart Cash',
            '1': 6.50,
          }
        ]
      })
    )
  })
]
