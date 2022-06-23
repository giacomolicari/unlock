import React, { useState, useEffect } from 'react'
import { Button } from '@unlock-protocol/ui'
import { addressMinify } from '../../../utils/strings'

const styles = {
  title: 'text-base font-medium text-black break-all	',
  description: 'text-sm font-normal text-gray-500',
  address: 'text-sm	font-sm font-normal text-gray-600',
}
interface MemberCardProps {
  lockName: string
  expiration: string
  keyholderAddress: string
  tokenId: string
  onExpireAndRefund: (lock: any) => void
  expandAllMetadata: boolean
  isLockManager?: boolean
  expireAndRefundDisabled?: boolean
  metadata?: object
}

const keysToIgnore = ['token', 'lockName', 'keyholderAddress', 'expiration']

export const MemberCard: React.FC<MemberCardProps> = ({
  lockName,
  expiration,
  keyholderAddress,
  tokenId,
  onExpireAndRefund,
  expandAllMetadata,
  expireAndRefundDisabled = true,
  metadata = {},
}) => {
  const [showMetaData, setShowMetaData] = useState(expandAllMetadata)

  const extraDataItems: [string, string][] = Object.entries(
    metadata || {}
  ).filter(([key]) => {
    return !keysToIgnore.includes(key)
  })

  const toggleMetada = () => {
    setShowMetaData(!showMetaData)
  }

  useEffect(() => {
    setShowMetaData(expandAllMetadata)
  }, [expandAllMetadata])

  const hasExtraData = extraDataItems?.length > 0

  return (
    <div
      data-testid="member-card"
      className="border-2 rounded-lg py-4 px-10 hover:shadow-sm bg-white"
    >
      <div className="grid grid-cols-7 gap-2 justify-between">
        <div className="flex flex-col">
          <span className={styles.description}>Lock name</span>
          <span className={styles.title}>{lockName}</span>
        </div>
        <div className="flex flex-col">
          <span className={styles.description}>Owner</span>
          <span className={styles.title}>
            {addressMinify(keyholderAddress)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className={styles.description}>Token ID</span>
          <span className={styles.title}>{tokenId}</span>
        </div>
        <div className="flex flex-col">
          <span className={styles.description}>Expiration</span>
          <span className={styles.title}>{expiration}</span>
        </div>
        <div className="flex flex-col">
          <span className={styles.description}>Checked in At</span>
          <span className={styles.title}>-</span>
        </div>
        <div className="col-span-2 flex gap-2 justify-end">
          <Button
            size="small"
            variant="outlined-primary"
            disabled={expireAndRefundDisabled}
            onClick={onExpireAndRefund}
          >
            Expire and Refund
          </Button>
          <Button
            size="small"
            variant="outlined-primary"
            onClick={toggleMetada}
          >
            Show metadata
          </Button>
        </div>
      </div>
      <div>
        {showMetaData && (
          <div>
            <span className={styles.description}>Metadata</span>
            {!hasExtraData && (
              <span className="block">There is no metadata</span>
            )}
            {hasExtraData &&
              hasExtraData &&
              extraDataItems?.map(([key, value], index) => {
                return (
                  <div key={index}>
                    <strong>{key}</strong>: <span>{value}</span>
                  </div>
                )
              })}
          </div>
        )}
      </div>
    </div>
  )
}
