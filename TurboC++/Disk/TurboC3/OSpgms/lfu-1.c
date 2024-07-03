#include<stdio.h>
void main()
{
   int i,j,n,nf,p[20],frame[10],pf=0,count[50],time[50],flag,least,mintime,temp;
   printf("enter no. of frames:");
   scanf("%d",&nf);
   printf("enter length of input:");
   scanf("%d",&n);
   printf("enter input values:");
   for(i=0;i<n;i++)
   {
	scanf("%d",&p[i]);
   }
   for(i=0;i<nf;i++)
   {
	frame[i]=-1;
   }
   for(i=0;i<50;i++)
   {
        count[i]=0;
   }
   printf("ref string\t page frame\n");
   for(i=0;i<n;i++)
   {
        printf("%d\t\t",p[i]);
	count[p[i]]++;
	time[p[i]]=i;
	flag=1;
	least=frame[0];
      for(j=0;j<nf;j++)
      {
	  if(frame[j]==-1||p[i]==frame[j])
          {
	     if(frame[j]==-1)
	     {
		pf++;
	     }
	     flag=0;
	     frame[j]=p[i];
	     break;
	  }
          if(count[least]>count[frame[j]])
	  {
	     least=frame[j];
	  }
      }
      if(flag)
      {
	  mintime=50;
	  for(j=0;j<nf;j++)
          {
    	     if(count[frame[j]]==count[least]&&time[frame[j]]<mintime)
	     {
	        temp=j;
		mintime=time[frame[j]];
	     }
          }
	  count[frame[temp]]=0;
	  frame[temp]=p[i];
	  pf++;
      }
      for(j=0;j<nf;j++)
      {
	   if(frame[j]!=-1)
	   {
	      printf("%d\t",frame[j]);
	   }
      }
      printf("\n");
    }
   printf("no. of page faults=%d",pf);
}

