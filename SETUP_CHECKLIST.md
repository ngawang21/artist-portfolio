# Setup Checklist

Use this checklist to ensure all services are properly configured before going live.

## ✅ Pre-Deployment Checklist

### 1. Resend Email Service
- [ ] Create Resend account at https://resend.com
- [ ] Verify email address
- [ ] Generate API key
- [ ] Copy API key (starts with `re_`)
- [ ] (Optional) Add and verify custom domain
- [ ] Test email sending with sandbox

### 2. GitHub Personal Access Token
- [ ] Go to GitHub Settings → Developer settings → Personal access tokens
- [ ] Create fine-grained token
- [ ] Set repository access to `ngawang21/artist-portfolio`
- [ ] Grant "Contents: Read and write" permission
- [ ] Copy token (starts with `ghp_`)

### 3. Mollie Payment Gateway
- [ ] Verify Mollie account is active
- [ ] Get TEST API key (starts with `test_`)
- [ ] Configure webhook URL in Mollie dashboard
- [ ] Test payment flow in test mode
- [ ] (Later) Get LIVE API key for production

### 4. Netlify Environment Variables
Go to Netlify Dashboard → Site Settings → Environment Variables and add:

- [ ] `MOLLIE_API_KEY` = `test_xxxxx` (use test mode first)
- [ ] `RESEND_API_KEY` = `re_xxxxx`
- [ ] `GITHUB_TOKEN` = `ghp_xxxxx`
- [ ] `GITHUB_REPO` = `ngawang21/artist-portfolio`
- [ ] `ARTIST_EMAIL` = Your email address
- [ ] `ARTIST_NAME` = `Dempa Tsang Kunga`
- [ ] `SITE_URL` = `https://kunart.netlify.app`

### 5. Deploy to Netlify
- [ ] Code is pushed to GitHub (already done)
- [ ] Netlify auto-deploys from main branch
- [ ] Check deployment logs for errors
- [ ] Verify all Netlify Functions deployed successfully

## ✅ Testing Checklist

### Test Payment Flow (Test Mode)

1. **Checkout Page**
   - [ ] Visit https://kunart.netlify.app/checkout/weeping-willow
   - [ ] Form displays correctly
   - [ ] All fields are present

2. **Payment Creation**
   - [ ] Fill in test customer details
   - [ ] Click "Proceed to Payment"
   - [ ] Redirects to Mollie test checkout
   - [ ] Check Netlify Functions logs for `create-payment`

3. **Complete Payment**
   - [ ] Use Mollie test payment method
   - [ ] Complete payment successfully
   - [ ] Redirects to success page

4. **Verify Webhook Processing**
   - [ ] Check Netlify Functions logs for `payment-webhook`
   - [ ] Verify invoice number generated
   - [ ] Check for "Invoice PDF generated" log
   - [ ] Check for "Buyer email sent" log
   - [ ] Check for "Artist email sent" log
   - [ ] Check for "Artwork marked as sold" log

5. **Verify Email Delivery**
   - [ ] Check buyer email inbox
   - [ ] Verify confirmation email received
   - [ ] Verify invoice PDF attached
   - [ ] Check artist email inbox
   - [ ] Verify notification email received
   - [ ] Verify invoice PDF attached

6. **Verify GitHub Updates**
   - [ ] Check GitHub repository commits
   - [ ] Verify invoice counter updated
   - [ ] Verify invoice PDF saved in `/invoices/`
   - [ ] Verify artwork JSON updated with `sold: true`

7. **Verify Gallery Update**
   - [ ] Wait for Netlify to rebuild (automatic)
   - [ ] Visit gallery page
   - [ ] Verify artwork shows "Sold" overlay
   - [ ] Verify "Buy" button is hidden

### Test French Version

- [ ] Visit https://kunart.netlify.app/fr/checkout/weeping-willow
- [ ] Verify all text is in French
- [ ] Complete checkout in French
- [ ] Verify email received in French
- [ ] Verify invoice in French format

### Test Error Handling

- [ ] Try submitting checkout form with missing fields
- [ ] Try accessing checkout for sold artwork
- [ ] Verify appropriate error messages

## ✅ Production Checklist

### Before Going Live

- [ ] All tests passed in test mode
- [ ] Email delivery working correctly
- [ ] Invoice generation working correctly
- [ ] Artwork status updates working
- [ ] CMS accessible and working
- [ ] All artworks have correct data

### Switch to Production

1. **Mollie Live Mode**
   - [ ] Complete Mollie business verification
   - [ ] Get LIVE API key (starts with `live_`)
   - [ ] Update `MOLLIE_API_KEY` in Netlify to live key
   - [ ] Trigger new deployment

2. **Resend Production**
   - [ ] Verify custom domain (if using)
   - [ ] Update `ARTIST_EMAIL` to verified domain
   - [ ] Test email delivery in production

3. **Final Verification**
   - [ ] Test complete flow with small real payment
   - [ ] Verify all emails received
   - [ ] Verify invoice generated correctly
   - [ ] Verify artwork marked as sold
   - [ ] Refund test payment if needed

## ✅ Post-Launch Checklist

### Monitoring

- [ ] Set up email notifications for Netlify deployments
- [ ] Monitor Netlify Functions usage
- [ ] Monitor Resend email quota
- [ ] Check Mollie dashboard regularly
- [ ] Review GitHub commits for CMS updates

### Documentation

- [ ] Share DEPLOYMENT_GUIDE.md with team
- [ ] Document any custom configurations
- [ ] Keep API keys secure and backed up
- [ ] Document any issues and solutions

### Maintenance

- [ ] Schedule weekly check of email delivery
- [ ] Schedule monthly review of Netlify Functions logs
- [ ] Plan for API key rotation (quarterly)
- [ ] Keep dependencies updated

## 🎉 Launch!

Once all checklists are complete:
- [ ] Announce website launch
- [ ] Share gallery link
- [ ] Monitor first sales closely
- [ ] Celebrate! 🎨

## 📞 Support

If you encounter issues:
1. Review this checklist
2. Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
3. Review service dashboards (Netlify, Mollie, Resend, GitHub)
4. Check Netlify Functions logs for errors

---

**Remember**: Always test in test mode before switching to production!
