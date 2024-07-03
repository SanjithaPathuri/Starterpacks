#include<stdio.h>
void main()
{
        int i,j,k,n,nf,inp[20],ntr[20],frame[10],min,pf=0;
        printf("enter no of frames:");
        scanf("%d",&nf);
        printf("enter no of pages:");
        scanf("%d",&n);
        printf("enter input values");
        for(i=0;i<n;i++)
        scanf("%d",&inp[i]);
        for(i=0;i<nf;i++)
        {
                ntr[i]=0;
                frame[i]=-1;
        }
        for(i=0;i<n;i++)
        {
                for(j=0;j<nf;j++)
                if(inp[i]==frame[j])
                {
                        ntr[j]++;
                        break;
                }
                if(j==nf)
                {
                        min=0;
                        for(k=1;k<nf;k++)
                          if(ntr[k]<ntr[min])
                             min=k;
                             frame[min]=inp[i];
                             ntr[min]=1;
                             pf++;
                }
                printf("\n");
                for(j=0;j<nf;j++)
		     printf("\t%d",frame[j]);
                if(j==nf)
                     printf("\t--->%d",pf);
        }
        printf("\ntotal no of page faults=%d",pf);
}



